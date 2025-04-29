const {JSDOM} = require('jsdom');
//import {JSDOM} from 'jsdom';
 async function crawlPage(baseURL, currentURL, pages){

    const baseURLObject = new URL(baseURL)
    const currentURLObject = new URL(currentURL)
// seen external link
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
   if (pages[normalizedCurrentURL] > 0){
       pages[normalizedCurrentURL]++
       return pages
   }

   pages[normalizedCurrentURL]=1
    console.log(`Actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if ( resp.status >399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, context type: ${contentType}, on page ${currentURL}`)
            return pages
        }
        //console.log(await resp.text())
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL,nextURL, pages);
        }
    } catch (error) {
        console.log(`ERROR: fetch to fetch: ${currentURL} msg: ${error}`)
    }
   return pages
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


//makes this function available to other
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}
//export { normalizeURL, getURLsFromHTML, crawlPage };
