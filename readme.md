<div align="center">
    <h1>
        <img width=400 src="./blimpy.png" alt="blimpy blimp"/>
    </h1>
    <p>
      If you need to quickly assign a prototype to an object,
      <br/>
      such as one from a database, <strong>blimpy</strong> is the best way to do it.
    </p>
    <p>
        <img src="https://img.shields.io/npm/v/blimpy.svg" />
        <img src="https://img.shields.io/travis/skunkmb/blimpy.svg" />
        <img src="https://img.shields.io/github/license/skunkmb/blimpy.svg" />
    </p>
</div>


## Why?

Most databases don't store an object's prototype. This means if you're doing something like  

`firebaseRef.set(someFoodObject);`

and then retrieving it later, *it won't have the methods from `FoodClass`*.

**What should you do?**

 - Using `Object.setPrototypeOf` [is terrible for performance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).
 - A combination of `Object.assign` and `Object.create` is ugly if you're doing it over and over again.
 - `Object.create` and `Object.getOwnPropertyDescriptors` is even worse.

**Using blimpy makes it easy to add a prototype to an object.**

 - blimpy is **small** (`blimpy.min.js` is less than `200 bytes`).
 - blimpy is **simple** (blimpy only uses `2` built-in JS functions).
 - blimpy is **well-tested** (blimpy has `16` tests using MochaJS)

## Sample Usage

 1. **Get some object**. It doesn't matter where from.

     - *…from a database…*

       ```js
       let foodObject = getFoodObjectFromDatabase('apple');
       ```

     - *…or with an object literal…*

       ```js
       let foodObject = { name: 'apple', price: 5 };
       ```

 2. **Use blimpy**.

    ```js
    let food = blimpy.withClass(FoodClass, foodObject);
    ```

 3. **Profit**. *(Use the class's methods.)*

    ```js
    food.eat();
    console.log(food.getPriceStr());
    ```

## Install

```bash
npm install --save blimpy
```

---

## Full Docs

#### withClass

*Adds a class's prototype to an object (without mutating it).*

`blimpy.withClass(someClass, someObject)`

 - `someClass`: The class to add.
 - `someObject`: The object to add it to.
 - **Returns**: The new object with the class's prototype.

#### withNoClass

*Removes an object's prototype (without mutating it).* Actually, this sets the object's prototype to `Object.prototype` (the default object prototype).

`blimpy.withNoClass(someObject)`

 - `someObject`: The object to remove the class from.
 - **Returns**: The new object without a prototype.

## Full Example File

```js
let blimpy = require('blimpy');

// Arbitrary class.
class FoodClass {
    constructor(name) {
        this.name = name;
        this.price = name.length;
    }

    getPriceStr() {
        return '$' + this.price.toString();
    }
}

// Some food object without the `Food` class prototype, in this case
// an object literal.
let foodObject = {
    name: 'apple',
    price: 5,
}

// Add the prototype with blimpy.
let food = blimpy.withClass(FoodClass, foodObject);

// Logs `$5`.
console.log(food.getPriceStr());
```
