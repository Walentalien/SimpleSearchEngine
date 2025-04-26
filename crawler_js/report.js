// function sortPages(pages){
//     const pagesArr = Object.entries(pages)
//     pagesArr.sort((a,b) =>{
//         aHits = a[1]
//         bHits = b[1]
//         return aHits - bHits
//
//         })
//
//     return pagesArr
// }
function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);

    return pagesArray;
}

function printReport(pages){
    console.log("====================")
    console.log("REPORT")
    console.log("====================")
    const sortedPages = sortPages(pages)
    for (const SortedPage of sortedPages) {
        const url = SortedPage[0]
        const hits = SortedPage[1]
        console.log(`Found ${hits} links to page ${url}`)
    }
    console.log("====================")
    console.log("END OF REPORT")
    console.log("====================")

}
module.exports = {
    sortPages,
    printReport
}

