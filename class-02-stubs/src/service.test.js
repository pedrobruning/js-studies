const sut = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

const PLANETS_URL_1 = 'https://swapi.dev/api/planets/1/'
const PLANETS_URL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
    tatooine: require('./../mocks/tatooine.json'),
    alderaan: require('./../mocks/alderaan.json')
}

;

(async () => {    
    //Arrange
    const service = new sut()
    const stub = sinon.stub(service, service.makeRequest.name)
    stub
        .withArgs(PLANETS_URL_1)
        .resolves(mocks.tatooine)
    stub
        .withArgs(PLANETS_URL_2)
        .resolves(mocks.alderaan)
    //Act
    {
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            "moviesCount": 5
        }
        const results = await service.getPlanets(PLANETS_URL_1)
        deepStrictEqual(expected, results)
    }
    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            "moviesCount": 2
        }
        const results = await service.getPlanets(PLANETS_URL_2)
        deepStrictEqual(expected, results)
    }

})();