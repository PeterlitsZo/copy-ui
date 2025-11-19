use crate::ast::Expr;
use std::collections::HashMap;

pub fn evaluate_expr(expr: &Expr, features: &HashMap<String, bool>) -> bool {
    match expr {
        Expr::Feature(name) => features.get(name).copied().unwrap_or(false),
        Expr::And(left, right) => evaluate_expr(left, features) && evaluate_expr(right, features),
        Expr::Or(left, right) => evaluate_expr(left, features) || evaluate_expr(right, features),
        Expr::Not(inner) => !evaluate_expr(inner, features),
    }
}

