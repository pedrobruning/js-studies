const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/header-invalid.csv'
        const rejection = new Error(error.FILE_HEADERS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/invalidDateFormat-invalid.csv'
        const rejection = new Error(error.FILE_DATE_FORMAT_ERROR)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/titleGreaterThanFortyChar-invalid.csv'
        const rejection = new Error(error.FILE_TITLE_LENGTH_ERROR)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/twentyOneItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
              "id": 1,
              "title": "How to Work with Mocks",
              "description": "In this post we will learn how to work with mocks",
              "author": "Bruning",
              "createdAt": "2022-06-04"
            },
            {
              "id": 2,
              "title": "How to Work as a Team",
              "description": "In this post we will learn how to work as a team",
              "author": "Bruning",
              "createdAt": "2022-03-04"
            },
            {
              "id": 3,
              "title": "How testing could save you and your job",
              "description": "In this post we will learn how testing can prevent you from being fired",
              "author": "Bruning",
              "createdAt": "2022-01-04"
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
