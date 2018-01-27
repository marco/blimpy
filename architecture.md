# Architecture

 - `dist`: The distribution directory. This is where minified files go for use. It is updated *not after every change*, but *on version increases* (commits in the style of `Bump to vX.Y.Z.`).

    - `blimpy.min.js`: The minified version of `src/blimpy.js`.

 - `src`: The source directory. This is where the original, unminified code goes.

    - `blimpy.js`: The main blimpy file. `module.exports` is used inside to export all of the blimpy functions.

 - `tests`: The testing directory. This is where tests are done.

    - `blimpy.js`: Tests for `src/blimpy.js` *and* `dist/blimpy.min.js` using MochaJS.
