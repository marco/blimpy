let assert = require('assert');

/**
 * A "food" class for testing.
 */
class Food {
    /**
     * Create a food.
     * @param {string} name The name of the food.
     */
    constructor(name) {
        this.name = name;
        this.price = name.length * 10;
    }

    /**
     * Get the price of the food.
     * @returns {string} The price, e.g., `$130`.
     */
    getPriceStr() {
        return '$' + this.price.toString();
    }
}

/**
 * A "drink" class for testing.
 */
class Drink {
    /**
     * Create a drink.
     * @param {string} name The name of the drink.
     */
    constructor(name) {
        this.name = name;
        this.price = name.length * 5;
    }

    /**
     * Get the price of the drink.
     * @returns {string} The price, e.g., `$130`.
     */
    getPriceStr() {
        return '$' + this.price.toString();
    }
}

let blimpys = ['src/blimpy', 'dist/blimpy.min'];

for (let i = 0; i < blimpys.length; i++) {
    let currentBlimpy = blimpys[i]
    let blimpy = require('../' + currentBlimpy + '.js');

    describe(currentBlimpy, () => {
        describe('"positives"', () => {
            let foodObject;

            beforeEach(() => {
                foodObject = {
                    name: 'apple',
                    price: 50,
                };
                assert.equal(foodObject.__proto__, Object.prototype);
            });

            describe('.withClass', () => {
                let foodObjectWithProto;

                beforeEach(() => {
                    foodObjectWithProto = blimpy.withClass(Food, foodObject);
                });

                it('should not mutate the original object', () => {
                    assert.equal(foodObject.__proto__, Object.prototype);
                });

                it('should return the object with the new prototype', () => {
                    assert.equal(
                        foodObjectWithProto.__proto__,
                        Food.prototype
                    );
                });

                it('should add working methods', () => {
                    assert.equal(foodObjectWithProto.getPriceStr(), '$50');
                });

                it('should work on objects with a prototype', () => {
                    let drinkObject = new Drink('water');
                    assert.equal(drinkObject.__proto__, Drink.prototype);

                    foodObjectWithProto = blimpy.withClass(Food, drinkObject);
                    assert.equal(
                        foodObjectWithProto.__proto__,
                        Food.prototype
                    );
                });
            });
        });

        describe('"negatives"', () => {
            let foodObject;

            beforeEach(() => {
                foodObject = new Food('apple');
                assert.equal(foodObject.__proto__, Food.prototype);
            });

            describe('.withNoClass', () => {
                let foodObjectWithNoProto;

                beforeEach(() => {
                    foodObjectWithNoProto = blimpy.withNoClass(foodObject);
                });

                it('should not mutate the original object', () => {
                    assert.equal(foodObject.__proto__, Food.prototype);
                });

                it('should return the object with the new prototype', () => {
                    assert.equal(
                        foodObjectWithNoProto.__proto__,
                        Object.prototype,
                    );
                });

                it('should remove working methods', () => {
                    assert.equal(foodObjectWithNoProto.getPriceStr, undefined);
                });

                it('should work on objects with no prototype', () => {
                    foodObject = {
                        name: 'apple',
                        price: 50,
                    };
                    assert.equal(foodObject.__proto__, Object.prototype);

                    foodObjectWithNoProto = blimpy.withNoClass(foodObject);
                    assert.equal(
                        foodObjectWithNoProto.__proto__,
                        Object.prototype,
                    );
                });
            });
        });
    });
}
