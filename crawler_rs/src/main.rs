use clap::Parser;
use log2::*;


mod args_parser;
use args_parser::*;
fn main () {
    // initialize logging with log2
    let _log2 = open("log.txt")
        .module(true)
        .module_with_line(true)
        .start();
    info!("Logging has been initialized.");

    let program_args = CrawlerArgs::parse();


}