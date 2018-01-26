let blimpy = {};

blimpy.withClass(someClass, someObject) {
    return Object.assign(
        Object.create(someClass.prototype),
        someObject,
    );
}

blimpy.setClass(someClass, someObject) {
    return someObject = blimpy.withClass(someClass, someObject);
}

blimpy.withNoClass(someObject) {
    return blimpy.withClass(Object, someObject);
}

blimpy.setNoClass(someObject) {
    return someObject = blimpy.withNoClass(someObject);
}

module.exports = blimpy;
