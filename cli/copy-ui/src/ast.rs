#[derive(Debug, Clone)]
pub enum TpAst {
    #[allow(dead_code)]
    Features(Vec<String>),
    File(String),
    If {
        condition: Expr,
        then_block: Vec<TpAst>,
        elif_blocks: Vec<(Expr, Vec<TpAst>)>,
        else_block: Option<Vec<TpAst>>,
    },
}

#[derive(Debug, Clone)]
pub enum TpfAst {
    Put(String),
    If {
        condition: Expr,
        then_block: Vec<TpfAst>,
        elif_blocks: Vec<(Expr, Vec<TpfAst>)>,
        else_block: Option<Vec<TpfAst>>,
    },
}

#[derive(Debug, Clone)]
pub enum Expr {
    Feature(String),
    And(Box<Expr>, Box<Expr>),
    Or(Box<Expr>, Box<Expr>),
    Not(Box<Expr>),
}

