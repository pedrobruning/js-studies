const { readFile } = require('fs/promises')
const Post = require('./post')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {    
    maxLines: 20,
    fields: ['id','title','description','author','created_at'],
    titleLength: 40,
    dateFormat: /^\d{4}-\d{2}-\d{2}$/
}

const TITLE_INDEX = 1
const CREATED_AT_INDEX = 4

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)        
        const validation = File.isValid(content)
        if (!validation.valid) {
            throw new Error(validation.error)
        }
        const posts = File.parseCsvToJson(content)
        return posts
    }

    static parseCsvToJson(csvString) {
        const lines = csvString.split('\r\n')
        const firstLine = lines.shift()
        const headers = firstLine.split(',')
        const posts = lines.map(line => {
            const columns = line.split(',')
            let post = {}
            for (const index in columns) {
                post[headers[index]] = columns[index]
            }
            return new Post(post)            
        })
        return posts
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf-8')
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [headers, ...fileWithoutHeaders] = csvString.split('\r\n')
        const isHeaderValid = headers === options.fields.join(',')        

        if (!isHeaderValid) {
            return File.validationError(error.FILE_HEADERS_ERROR_MESSAGE)
        }

        const isContentLengthValid = (
            fileWithoutHeaders.length > 0 &&
            fileWithoutHeaders.length <= options.maxLines
        )

        if (!isContentLengthValid) {
            return File.validationError(error.FILE_LENGTH_ERROR_MESSAGE)
        }

        const isTitleValid = File.validateTitleLength(fileWithoutHeaders, options.titleLength)

        if (!isTitleValid) {
            return File.validationError(error.FILE_TITLE_LENGTH_ERROR)
        }        

        const isCreatedAtValid = File.validateDateFormat(fileWithoutHeaders, options.dateFormat)
                
        if (!isCreatedAtValid) {
            return File.validationError(error.FILE_DATE_FORMAT_ERROR)
        }

        return {
            valid: true
        }
    }

    static validateTitleLength(lines, titleLength) {
        let isValid = true
        lines.forEach((element) => {
            if ((element.split(','))[TITLE_INDEX].length > titleLength) {
                isValid = false
            }
        })
        return isValid
    }

    static validateDateFormat(lines, format) {
        let isValid = true
        lines.forEach((element) => {
            if ((element.split(','))[CREATED_AT_INDEX].match(format) === null) {
                isValid = false
            }
        })
        return isValid
    }

    static validationError(error) {
        return {
            error: error,
            valid: false
        }
    }
}

module.exports = File
