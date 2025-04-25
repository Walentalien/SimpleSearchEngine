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
module.exports = normalizeURL;