const {test, expect} = require("@jest/globals");
const {sortPages}= require("./report.js");


test('sortPages: Sort on times seen', () => {
    const input = {
        'https://blog.boot.dev/path1':1,
        'https://blog.boot.dev/path':3
    }
    const actual = sortPages(input);
    const expected = [
        ['https://blog.boot.dev/path',3],
        [ 'https://blog.boot.dev/path1',1]
    ];
    expect(actual).toEqual(expected);
});

test('sortPages: Sort on specific page', () => {
    const input = {
        'https://blog.boot.dev/path1':3,
        'https://blog.boot.dev/path34':35,
        'https://blog.boot.dev/path3':5,
        'https://blog.boot.dev/path231':2,
        'https://blog.boot.dev/path1/56':9,
        'https://blog.boot.dev/path787':6
    }
    const actual = sortPages(input);
    const expected = [
        ['https://blog.boot.dev/path34',35],
        ['https://blog.boot.dev/path1/56',9],
        ['https://blog.boot.dev/path787',6],
        [        'https://blog.boot.dev/path3',5],
        [        'https://blog.boot.dev/path1',3],
        ['https://blog.boot.dev/path231',2]
    ];

        expect(actual).toEqual(expected);
})