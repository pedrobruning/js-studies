class Post {
    constructor({id, title, type, price}) {
        this.id = parseInt(id)
        this.title = title
        this.type = type
        this.price = parseInt(price)  
    }
}

module.exports = Post