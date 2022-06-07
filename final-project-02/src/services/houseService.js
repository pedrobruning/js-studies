const BaseRepository = require('./../repositories/base/baseRepository')

class HouseService {
    constructor({ houses }) {
        this.houseRepository = new BaseRepository({ file: houses })     
    }

    test() {
        return this.houseRepository.findById()
    }
}

module.exports = HouseService