const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')
const Post = require('./post')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "title", "type", "price"]
}

const NEW_LINE_STRING = '\r\n'

class File {
    static async csvToJson(filePath) {
        const csvString = await File.getFileContent(filePath)
        const validation = File.isValid(csvString)
        if (!validation.valid) throw Error(validation.error)
        const result = File.parseCsvToJson(csvString)
        return result
    }

    static async getFileContent(filePath) {
        const fileName = join(__dirname, filePath)
        return (await readFile(fileName)).toString("utf-8")
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithoutHeaders] = csvString.split(NEW_LINE_STRING)        
        const isHeaderValid = header === options.fields.join(', ')
        if (!isHeaderValid) {            
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            fileWithoutHeaders.length > 0 &&
            fileWithoutHeaders.length <= options.maxLines
        )
        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

    static parseCsvToJson(csvString) {
        const lines = csvString.split(NEW_LINE_STRING)

        const firstLine = lines.shift()
        const header = firstLine.split(', ')
        const result = lines.map(line => {
            const columns = line.split(', ')
            let post = {}
            for (const column in columns) {
                post[header[column]] = columns[column]
            }
            return new Post(post)
        })
        return result
    }
}

module.exports = File