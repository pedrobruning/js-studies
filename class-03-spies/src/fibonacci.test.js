const sut = require('./fibonacci')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
;

(async () => {
    {
        const fibonacci = new sut()
        const fibonacciSpy = sinon.spy(fibonacci, fibonacci.execute.name)

        /**
        * generators return iterators, (.next)
        * there are 3 ways to read the data
        * using the method .next, for await and rest/spread
        */

        for (const i of fibonacci.execute(3)){}        

        const expectedCallCount = 4
        deepStrictEqual(expectedCallCount, fibonacciSpy.callCount)
    }
    {
        const fibonacci = new sut()
        const fibonacciSpy = sinon.spy(fibonacci, fibonacci.execute.name)
        
        const [...results] = fibonacci.execute(5)        

        const { args } = fibonacciSpy.getCall(2)

        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        deepStrictEqual(args, expectedParams)
        deepStrictEqual(results, expectedResult)
    }
})()