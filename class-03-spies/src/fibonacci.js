class Fibonacci {
    *execute (input, current = 0, next = 1) {
        if (input === 0) {
            return 0
        }
        //returns value
        yield current
        //delegate method but does not returns value
        yield* this.execute(input - 1, next, current + next)
    }
}

module.exports = Fibonacci