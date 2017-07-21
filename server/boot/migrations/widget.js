'use strict'

const path = require('path')
const model = 'Widget'

module.exports = function migrateBaseModels (app, next) {
  const mysql = app.dataSources.mysqlDb
  mysql.isActual(model, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'
    console.log('')
    console.log(`${model} models are ${syncStatus}`)
    if (actual) return next()

    console.log('Migrating Base Models...')

    mysql.autoupdate(model, (err, result) => {
      if (err) throw err
      console.log('Base models migration successful!')
      next()
    })
  })
}
