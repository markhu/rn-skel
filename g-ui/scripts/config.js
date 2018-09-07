#!/usr/bin/env node

/**
 * This file checks for config.local.js, and if not found creates a default
 * Also writes config.env.js which extras all G_UI_* env variables into an export
 */

let fs = require('fs')
let _ = require('lodash')

let CONFIG_LOCAL = __dirname + '/../packages/mobile/src/config/config.local.ts'
let CONFIG_ENV =  __dirname + '/../packages/mobile/src/config/config.env.ts'

let guiEnvVars = _.pickBy(process.env, function (item, key) {
  return key.indexOf('G_UI') === 0 || key.indexOf('BITRISE') === 0
})

try {
  fs.statSync(CONFIG_LOCAL)
} catch (err) {
  if (err.code === 'ENOENT') fs.writeFileSync(CONFIG_LOCAL, 'const config: any = { };\nexport default config;')
  else throw err
}

fs.writeFileSync(CONFIG_ENV, `
/* tslint:disable */
const config: any = ${JSON.stringify(guiEnvVars, null, 2)}
export default config
`)
