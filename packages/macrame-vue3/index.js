'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/macrame-vue3.cjs.prod.js');
} else {
    module.exports = require('./dist/macrame-vue3.cjs.js');
}
