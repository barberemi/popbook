const puppeteer = require('puppeteer')
const _ = require('lodash')
const characters = require('../datasources/characters.json')

const scrap = async () => {
  const characts = _.countBy(characters.hits, 'name')
  let duplicate = []
  _.map(characts, (value, index) => {
    if (value > 1) duplicate.push(index)
  })

  console.log(duplicate)
}

scrap().catch((e) => console.log(`error: ${e}`))
