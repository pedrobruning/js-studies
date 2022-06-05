const http = require('http')
const DEFAULT_USER = { username: 'Phbo', password: '123' }
const routes = {
    '/contact:get': (req, res) => {
        res.write('contact page')
        return res.end()
    },
    '/login:post': async (req, res) => {
        //res is a iterator
        for await (const data of req) {
            const user = JSON.parse(data)
            if (
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ) {
                res.writeHead(401)
                res.write('Unable to login')
                return res.end()
            }
        }
        
        res.write('Logged successfully')
        return res.end()
    },
    default: (req, res) => {
        res.write('Hello World!')
        return res.end()
    }
}

const handler = (req, res) => {
    const { url, method } = req
    const routeKey = `${url}:${method.toLowerCase()}`
    console.log('routeKey', routeKey)
    const route = routes[routeKey] || routes.default
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    return route(req, res)
}

const PORT = 3000

const app = http.createServer(handler)
                .listen(PORT, () => console.log('app running at', PORT))

module.exports = app