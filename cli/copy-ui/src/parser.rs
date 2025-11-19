use crate::ast::{Expr, TpAst, TpfAst};
use anyhow::{anyhow, Result};

pub fn parse_tp(content: &str) -> Result<Vec<TpAst>> {
    let mut ast = Vec::new();
    let lines: Vec<&str> = content.lines().collect();
    let mut i = 0;

    while i < lines.len() {
        let line = lines[i].trim();
        if line.is_empty() || line.starts_with("//") {
            i += 1;
            continue;
        }

        if line.starts_with("features") {
            let (features, consumed) = parse_features(&lines, i)?;
            ast.push(TpAst::Features(features));
            i = consumed;
        } else if line.starts_with("file") {
            let (filename, consumed) = parse_file(&lines, i)?;
            ast.push(TpAst::File(filename));
            i = consumed;
        } else if line.starts_with("if") {
            let (if_ast, consumed) = parse_if_tp(&lines, i)?;
            ast.push(if_ast);
            i = consumed;
        } else {
            return Err(anyhow!("Unexpected token at line {}: {}", i + 1, line));
        }
    }

    Ok(ast)
}

pub fn parse_tpf(content: &str) -> Result<Vec<TpfAst>> {
    let mut ast = Vec::new();
    let lines: Vec<&str> = content.lines().collect();
    let mut i = 0;

    while i < lines.len() {
        let line = lines[i];
        let trimmed = line.trim();
        
        if trimmed.is_empty() || trimmed.starts_with("//") {
            i += 1;
            continue;
        }

        if line.starts_with("  | ") {
            let (put_content, consumed) = parse_put(&lines, i)?;
            ast.push(TpfAst::Put(put_content));
            i = consumed;
        } else if trimmed.starts_with("if") {
            let (if_ast, consumed) = parse_if_tpf(&lines, i)?;
            ast.push(if_ast);
            i = consumed;
        } else {
            // Skip lines that are not control flow or put statements
            // (e.g., lines that are part of a multi-line expression)
            i += 1;
        }
    }

    Ok(ast)
}

fn parse_features(lines: &[&str], start: usize) -> Result<(Vec<String>, usize)> {
    let line = lines[start].trim();
    if !line.starts_with("features") {
        return Err(anyhow!("Expected 'features'"));
    }

    let rest = line.strip_prefix("features").unwrap().trim();
    if !rest.starts_with('[') {
        return Err(anyhow!("Expected '[' after 'features'"));
    }

    let mut features = Vec::new();
    let mut current = rest.strip_prefix('[').unwrap();
    
    loop {
        current = current.trim();
        if current.is_empty() {
            return Err(anyhow!("Unexpected end of features list"));
        }
        
        if current.starts_with('"') {
            let end_quote = current[1..].find('"')
                .ok_or_else(|| anyhow!("Unclosed string in features"))?;
            let feature = current[1..end_quote + 1].to_string();
            features.push(feature);
            current = &current[end_quote + 2..];
        } else {
            return Err(anyhow!("Expected string literal"));
        }

        current = current.trim();
        if current.starts_with(']') {
            current = &current[1..];
            if current.trim().ends_with(';') {
                return Ok((features, start + 1));
            }
            return Err(anyhow!("Expected ';' after features list"));
        } else if current.starts_with(',') {
            current = &current[1..];
        } else {
            return Err(anyhow!("Expected ',' or ']'"));
        }
    }
}

fn parse_file(lines: &[&str], start: usize) -> Result<(String, usize)> {
    let line = lines[start].trim();
    if !line.starts_with("file") {
        return Err(anyhow!("Expected 'file'"));
    }

    let rest = line.strip_prefix("file").unwrap().trim();
    let filename = rest
        .strip_suffix(';')
        .ok_or_else(|| anyhow!("Expected ';' after filename"))?
        .trim()
        .to_string();

    Ok((filename, start + 1))
}

fn parse_if_tp(lines: &[&str], start: usize) -> Result<(TpAst, usize)> {
    let (condition, _) = parse_if_condition(lines, start)?;
    
    let line = lines[start].trim();
    if !line.contains("then") {
        return Err(anyhow!("Expected 'then' after if condition"));
    }
    let mut i = start + 1;

    let mut then_block = Vec::new();
    let mut elif_blocks = Vec::new();
    let mut else_block = None;

    while i < lines.len() {
        let line = lines[i].trim();
        
        if line == "end" {
            return Ok((TpAst::If {
                condition,
                then_block,
                elif_blocks,
                else_block,
            }, i + 1));
        } else if line.starts_with("elif") {
            let (elif_condition, _) = parse_if_condition(lines, i)?;
            let elif_line = lines[i].trim();
            if !elif_line.contains("then") {
                return Err(anyhow!("Expected 'then' after elif condition"));
            }
            let mut elif_block = Vec::new();
            i += 1;
            
            while i < lines.len() && !lines[i].trim().starts_with("elif") 
                && !lines[i].trim().starts_with("else") 
                && !lines[i].trim().starts_with("end") {
                let line = lines[i].trim();
                if line.starts_with("file") {
                    let (filename, consumed) = parse_file(lines, i)?;
                    elif_block.push(TpAst::File(filename));
                    i = consumed;
                } else {
                    i += 1;
                }
            }
            
            elif_blocks.push((elif_condition, elif_block));
        } else if line.starts_with("else") {
            i += 1;
            let mut else_block_vec = Vec::new();
            
            while i < lines.len() && !lines[i].trim().starts_with("end") {
                let line = lines[i].trim();
                if line.starts_with("file") {
                    let (filename, consumed) = parse_file(lines, i)?;
                    else_block_vec.push(TpAst::File(filename));
                    i = consumed;
                } else {
                    i += 1;
                }
            }
            
            else_block = Some(else_block_vec);
        } else if line.starts_with("file") {
            let (filename, consumed) = parse_file(lines, i)?;
            then_block.push(TpAst::File(filename));
            i = consumed;
        } else {
            i += 1;
        }
    }

    Err(anyhow!("Unclosed 'if' block"))
}

fn parse_if_tpf(lines: &[&str], start: usize) -> Result<(TpfAst, usize)> {
    let (condition, _) = parse_if_condition(lines, start)?;
    
    let line = lines[start].trim();
    if !line.contains("then") {
        return Err(anyhow!("Expected 'then' after if condition"));
    }
    let mut i = start + 1;

    let mut then_block = Vec::new();
    let mut elif_blocks = Vec::new();
    let mut else_block = None;

    while i < lines.len() {
        let line = lines[i];
        let trimmed = line.trim();
        
        if trimmed == "end" {
            return Ok((TpfAst::If {
                condition,
                then_block,
                elif_blocks,
                else_block,
            }, i + 1));
        } else if trimmed.starts_with("elif") {
            let (elif_condition, _) = parse_if_condition(lines, i)?;
            let elif_line = lines[i].trim();
            if !elif_line.contains("then") {
                return Err(anyhow!("Expected 'then' after elif condition"));
            }
            let mut elif_block = Vec::new();
            i += 1;
            
            while i < lines.len() {
                let line = lines[i];
                let trimmed = line.trim();
                if trimmed.starts_with("elif") || trimmed.starts_with("else") || trimmed == "end" {
                    break;
                }
                if line.starts_with("  | ") {
                    let (put_content, consumed) = parse_put(lines, i)?;
                    elif_block.push(TpfAst::Put(put_content));
                    i = consumed;
                } else {
                    i += 1;
                }
            }
            
            elif_blocks.push((elif_condition, elif_block));
        } else if trimmed.starts_with("else") {
            i += 1;
            let mut else_block_vec = Vec::new();
            
            while i < lines.len() && !lines[i].trim().starts_with("end") {
                let line = lines[i];
                if line.starts_with("  | ") {
                    let (put_content, consumed) = parse_put(lines, i)?;
                    else_block_vec.push(TpfAst::Put(put_content));
                    i = consumed;
                } else {
                    i += 1;
                }
            }
            
            else_block = Some(else_block_vec);
        } else if line.starts_with("  | ") {
            let (put_content, consumed) = parse_put(lines, i)?;
            then_block.push(TpfAst::Put(put_content));
            i = consumed;
        } else {
            i += 1;
        }
    }

    Err(anyhow!("Unclosed 'if' block"))
}

fn parse_if_condition(lines: &[&str], start: usize) -> Result<(Expr, usize)> {
    let line = lines[start].trim();
    let rest = line.strip_prefix("if").unwrap_or_else(|| {
        line.strip_prefix("elif").unwrap_or(line)
    }).trim();
    
    // Find where "then" starts in the line
    let then_pos = rest.find("then").ok_or_else(|| anyhow!("Expected 'then' after condition"))?;
    let expr_str = &rest[..then_pos].trim();
    
    let (expr, _) = parse_expr(expr_str)?;
    Ok((expr, start))
}

fn parse_expr(s: &str) -> Result<(Expr, usize)> {
    let s = s.trim();
    parse_expr_or(s)
}

fn parse_expr_or(s: &str) -> Result<(Expr, usize)> {
    let (left, consumed) = parse_expr_and(s)?;
    let remaining = &s[consumed..].trim();
    
    if remaining.starts_with("or") {
        let (right, right_consumed) = parse_expr_or(&remaining[2..].trim())?;
        Ok((Expr::Or(Box::new(left), Box::new(right)), consumed + 2 + right_consumed))
    } else {
        Ok((left, consumed))
    }
}

fn parse_expr_and(s: &str) -> Result<(Expr, usize)> {
    let (left, consumed) = parse_expr_not(s)?;
    let remaining = &s[consumed..].trim();
    
    if remaining.starts_with("and") {
        let (right, right_consumed) = parse_expr_and(&remaining[3..].trim())?;
        Ok((Expr::And(Box::new(left), Box::new(right)), consumed + 3 + right_consumed))
    } else {
        Ok((left, consumed))
    }
}

fn parse_expr_not(s: &str) -> Result<(Expr, usize)> {
    let s = s.trim();
    if s.starts_with("not") {
        let (inner, consumed) = parse_expr_atom(&s[3..].trim())?;
        Ok((Expr::Not(Box::new(inner)), 3 + consumed))
    } else {
        parse_expr_atom(s)
    }
}

fn parse_expr_atom(s: &str) -> Result<(Expr, usize)> {
    let s = s.trim();
    if s.starts_with("features[") {
        let start = 9; // "features["
        let end = s[start..].find(']')
            .ok_or_else(|| anyhow!("Unclosed ']' in features expression"))?;
        let feature = s[start..start + end].trim_matches('"').to_string();
        Ok((Expr::Feature(feature), start + end + 1))
    } else {
        Err(anyhow!("Unexpected expression: {}", s))
    }
}

fn parse_put(lines: &[&str], start: usize) -> Result<(String, usize)> {
    let mut content = Vec::new();
    let mut i = start;
    
    while i < lines.len() && lines[i].starts_with("  | ") {
        let line_content = &lines[i][4..]; // Remove "  | "
        content.push(line_content);
        i += 1;
    }
    
    let mut result = content.join("\n");
    result.push('\n');
    
    Ok((result, i))
}

