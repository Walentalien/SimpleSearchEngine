const {JSDOM} = require('jsdom');

async function crawlPage(currentURL){
    console.log(`Actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if ( resp.status >399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
            return
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, context type: ${contentType}, on page ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (error) {
        console.log(`ERROR: fetch to fetch: ${currentURL} msg: ${error}`)
    }
}
function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    //Function for removeing trailing slashes, because dom adds it always
    const removeTrailingSlash = link => link.endsWith('/') ? link.slice(0, -1) : link;

    for (const linkElement of linkElements) {
        const href = linkElement.getAttribute('href')

        try {
            const url = new URL(href, baseUrl); // handles relative + absolute links
            urls.push(removeTrailingSlash(url.href));
        } catch (err) {
            // skip invalid URLs
            console.warn(`Invalid URL skipped: ${href}`);
        }
    }
    return urls
}
function normalizeURL(urlString){
    const urlObject = new URL(urlString);
    const hostPath =  `${urlObject.hostname}${urlObject.pathname}`;
    // if there is trailing slash
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);// everything but last character
    }
    return hostPath;
}


// makes this function available to other
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}