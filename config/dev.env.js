'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"https://www.yituizhineng.top/api/v2"',
  BASE_URL: '"http://localhost:9100"'
})
