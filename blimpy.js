let blimpy = {};

/**
 * Adds a class's prototype to an object without mutating it.
 *
 * @param {function} someClass The class to use.
 * @param {object} someObject The object to set the prototype of.
 * @returns {object} The object with the new prototype.
 */
blimpy.withClass(someClass, someObject) {
    return Object.assign(
        Object.create(someClass.prototype),
        someObject,
    );
}

/**
 * Adds a class's prototype to an object by mutating it.
 *
 * @param {function} someClass The class to use.
 * @param {object} someObject The object to set the prototype of.
 * @returns {object} The object with the new prototype.
 */
blimpy.setClass(someClass, someObject) {
    return someObject = blimpy.withClass(someClass, someObject);
}

/**
 * "Removes" an object's prototype by setting it to the `Object` prototype
 * without mutating it.
 *
 * @param {object} someObject The object to remove the prototype of.
 * @returns {object} The object without the prototype.
 */
blimpy.withNoClass(someObject) {
    return blimpy.withClass(Object, someObject);
}

/**
 * "Removes" an object's prototype by setting it to the `Object` prototype by
 * mutating it.
 *
 * @param {object} someObject The object to remove the prototype of.
 * @returns {object} The object without the prototype.
 */
blimpy.setNoClass(someObject) {
    return someObject = blimpy.withNoClass(someObject);
}

module.exports = blimpy;
