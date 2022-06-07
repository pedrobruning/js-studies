const Base = require('./base/base')

class Neighborhood extends Base {
    constructor({ id, name, houseIds }) {
        super({ id, name })
        this.houseIds = houseIds
    }
}

module.exports = Neighborhood
