const { House, Customer, Neighborhood } = require('./../src/entities/defaultEntities')
const faker = require('faker')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2

const neighborhood = new Neighborhood({
    id: faker.random.uuid(),
    name: faker.name,
    houseIds: []
})

const houses = []
const customers = []

for(let index = 0; index <= ITEMS_AMOUNT; index++) {
    const house = new House({
        id: faker.random.uuid(),
        name: faker.name,
        builtYear: faker.date.past().getFullYear(),
        available: true,
        hasPool: faker.boolean,
        price: faker.finance.amount(300, 1000)
    })
    
    neighborhood.houseIds.push(house.id)
    houses.push(house)

    const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name,
        age: faker.random.number({ min: 18, max: 60 })
    })

    customers.push(customer)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;

(async () => {
    await write('houses.json', houses)
    await write('neighborhoods.json', [neighborhood])
    await write('customers.json', customers)

    console.log('houses', houses)
    console.log('neighborhood', neighborhood)
})();