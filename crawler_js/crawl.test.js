const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL: Strip Protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toBe(expected);
});

test('normalizeURL: Remove trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toBe(expected);
});

// halndled by url constructor
test('normalizeURL: Get rid of capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toBe(expected);
});

test('normalizeURL: Strip http', () => {
    const input = 'http://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toBe(expected);
});


test('getURLsFromHTML: absolute url', () => {
    const inputHTMLbody = `
    <html lang="en">
        <head><title>
        </title></head> 
        <body>
            <a href = "https://blog.boot.dev"></a>
            </body>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ["https://blog.boot.dev"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML: relative url', () => {
    const inputHTMLbody = `
    <html lang="en">
        <head><title>
        </title></head> 
        <body>
            <a href = "path/"></a>
            </body>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML: both: absolute ans relative urls', () => {
    const inputHTMLbody = `
    <html lang="en">
        <head><title>
        </title></head> 
        <body>
          <a href = "https://blog.boot.dev/path2"></a>

            <a href = "path1/"></a>
            </body>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path2",
    "https://blog.boot.dev/path1"];
    expect(actual).toEqual(expected);
});

// So i was to lazy to reject odd-looking relative paths, will just check response status
test('getURLsFromHTML:invalid link', () => {
    const inputHTMLbody = `
    <html lang="en">
        <head><title>
        </title></head> 
        <body>
    

            <a href = "$$$path1/"></a>
            </body>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ["https://blog.boot.dev/$$$path1"];
    expect(actual).toEqual(expected);
});


