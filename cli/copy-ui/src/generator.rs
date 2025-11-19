use crate::ast::{TpAst, TpfAst};
use crate::config::ComponentConfig;
use crate::evaluator::evaluate_expr;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

pub fn generate_component(
    component_name: &str,
    config: &ComponentConfig,
    output_dir: &Path,
) -> anyhow::Result<()> {
    let index_tp_content = crate::templates::get_tp_file(component_name, "index.tp")?;
    let tp_ast = crate::parser::parse_tp(index_tp_content)?;

    let component_output_dir = output_dir.join(component_name);
    fs::create_dir_all(&component_output_dir)?;

    for node in &tp_ast {
        match node {
            TpAst::Features(_) => {
                // Features declaration, skip.
            }
            TpAst::File(filename) => {
                generate_file(
                    component_name,
                    filename,
                    &component_output_dir,
                    &config.features,
                )?;
            }
            TpAst::If {
                condition,
                then_block,
                elif_blocks,
                else_block,
            } => {
                if evaluate_expr(condition, &config.features) {
                    process_tp_block(then_block, component_name, &component_output_dir, &config.features)?;
                } else {
                    let mut matched = false;
                    for (elif_condition, elif_block) in elif_blocks {
                        if evaluate_expr(elif_condition, &config.features) {
                            process_tp_block(elif_block, component_name, &component_output_dir, &config.features)?;
                            matched = true;
                            break;
                        }
                    }
                    if !matched {
                        if let Some(else_block) = else_block {
                            process_tp_block(else_block, component_name, &component_output_dir, &config.features)?;
                        }
                    }
                }
            }
        }
    }

    Ok(())
}

fn process_tp_block(
    block: &[TpAst],
    component_name: &str,
    output_dir: &Path,
    features: &HashMap<String, bool>,
) -> anyhow::Result<()> {
    for node in block {
        match node {
            TpAst::File(filename) => {
                generate_file(component_name, filename, output_dir, features)?;
            }
            TpAst::If {
                condition,
                then_block,
                elif_blocks,
                else_block,
            } => {
                if evaluate_expr(condition, features) {
                    process_tp_block(then_block, component_name, output_dir, features)?;
                } else {
                    let mut matched = false;
                    for (elif_condition, elif_block) in elif_blocks {
                        if evaluate_expr(elif_condition, features) {
                            process_tp_block(elif_block, component_name, output_dir, features)?;
                            matched = true;
                            break;
                        }
                    }
                    if !matched {
                        if let Some(else_block) = else_block {
                            process_tp_block(else_block, component_name, output_dir, features)?;
                        }
                    }
                }
            }
            _ => {}
        }
    }
    Ok(())
}

fn generate_file(
    component_name: &str,
    filename: &str,
    output_dir: &Path,
    features: &HashMap<String, bool>,
) -> anyhow::Result<()> {
    let tpf_content = crate::templates::get_tpf_file(component_name, filename)?;
    let tpf_ast = crate::parser::parse_tpf(tpf_content)?;
    let mut buffer = String::new();

    process_tpf_block(&tpf_ast, &mut buffer, features)?;

    let output_path = output_dir.join(filename);
    fs::write(&output_path, buffer)?;
    println!("Generated: {}", output_path.display());

    Ok(())
}

fn process_tpf_block(
    block: &[TpfAst],
    buffer: &mut String,
    features: &HashMap<String, bool>,
) -> anyhow::Result<()> {
    for node in block {
        match node {
            TpfAst::Put(content) => {
                buffer.push_str(content);
            }
            TpfAst::If {
                condition,
                then_block,
                elif_blocks,
                else_block,
            } => {
                if evaluate_expr(condition, features) {
                    process_tpf_block(then_block, buffer, features)?;
                } else {
                    let mut matched = false;
                    for (elif_condition, elif_block) in elif_blocks {
                        if evaluate_expr(elif_condition, features) {
                            process_tpf_block(elif_block, buffer, features)?;
                            matched = true;
                            break;
                        }
                    }
                    if !matched {
                        if let Some(else_block) = else_block {
                            process_tpf_block(else_block, buffer, features)?;
                        }
                    }
                }
            }
        }
    }
    Ok(())
}

