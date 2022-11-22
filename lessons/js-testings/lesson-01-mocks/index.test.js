const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
    {
        const filePath = './../mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './../mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './../mocks/threeItems-valid.csv'
        const expected = [
          {
            "id": 1,
            "title": "House with three floors",
            "type": "Sale",
            "price": 1500000
          },
          {
            "id": 2,
            "title": "Penthouse with two floors four badrooms and three bathrooms",
            "type": "Sale",
            "price": 5500000
          },
          {
            "id": 3,
            "title": "Country house with one barn",
            "type": "Sale",
            "price": 2500000
          }
        ]
        const result = await File.csvToJson(filePath)
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})();
