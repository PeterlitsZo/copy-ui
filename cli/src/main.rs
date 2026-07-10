use std::process::exit;

mod app;
mod cli;
mod config;

fn main() {
    let cli = cli::parse_cli();
    let app = app::App::new();

    match run(app, cli) {
        Ok(_) => {}
        Err(e) => {
            eprintln!("{}", e.message);
            exit(1);
        }
    }
}

fn run(app: app::App, cli: cli::Cli) -> app::AppResult<()> {
    match cli.command {
        cli::Commands::Add(arg) => match arg.command {
            cli::AddCommand::Component(arg) => app.add_component(&arg.component_name, &arg.config),
        },
    }
}
