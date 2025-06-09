use std::env;
use clap::{Parser, Arg};

fn default_html_dir() -> String {
    env::var("RAW_HTMLS_PATH")
        .unwrap_or_else(|_| "/media/walentyn/HDD/MyGitHubRepos/SimpleSearchEngine/scraped_raw_htmls".to_string())
}
const STARTING_URL: &str = "https://en.wikipedia.org/wiki/Main_Page";
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct CrawlerArgs {
    /// Starting URL
    #[arg(long, required = true)]
    pub starting_url: String,

    #[arg(long, default_value_t = 100_000)]
    pub max_links: u64,

    #[arg(long, default_value_t = default_html_dir())]
    pub html_saving_dir: String,

    /// Number of worker threads
    #[arg(short, long, default_value_t = 4)]
    pub n_worker_threads: u64,
}

pub fn print_args()