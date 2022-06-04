class Post {
    constructor({ id, title, description, author, created_at }) {
        this.id = parseInt(id)
        this.title = title
        this.description = description
        this.author = author
        this.createdAt = created_at
    }
}

module.exports = Post
