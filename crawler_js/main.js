
//const {crawlPage} = require('./crawl.js');
import { crawlPage } from './crawl.js';

async function main() {
    if (process.argv.length < 3) {
        console.log("No website provided")
        process.exit(1);
    }
    // for (let arg of process.argv) {
    //     console.log(arg)
    // }
    const baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}
await main()