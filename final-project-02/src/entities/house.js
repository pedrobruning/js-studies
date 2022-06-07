const Base = require('./base/base')

class House extends Base {
    constructor({ id, name, builtYear, available, hasPool, price }) {
        super({ id, name })
        this.builtYear = builtYear
        this.available = available
        this.hasPool = hasPool
        this.price = price
    }
}

module.exports = House
