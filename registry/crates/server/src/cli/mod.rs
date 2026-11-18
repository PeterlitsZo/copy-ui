use clap::Parser;

#[derive(Parser)]
#[command(version, about, long_about = None)]
pub(crate) struct Cli {
    /// Path to the configuration file.
    #[arg(short, long, value_name = "CONFIG")]
    pub(crate) config: String,
}
