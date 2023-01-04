const puppeteer = require('puppeteer')
const fs = require('fs')
const _ = require('lodash')
const knows_urls = require('../datasources/knows_urls.json')
const new_urls = require('../datasources/new_urls.json')

// 2 - Récupération des URLs de toutes les pages à visiter
const getAllUrl = async (browser) => {
  const new_urls = []
  const page = await browser.newPage()
  await page.goto('https://www.placedespop.com/plan-du-site')
  await page.waitForTimeout('body')
  const result = await page.evaluate(() =>
    [...document.querySelectorAll('div.contenu-texte > ul > li > a[href*="/figurines-funko-pop/"]')]
      .map((link) => link.href)
      .filter(function (link) {
        return !link.includes('liste-par-annee') && (link.match(/\//g) || []).length === 6
      })
  )

  _.map(result, (link) => {
    if (!_.includes(knows_urls, link)) {
      new_urls.push(link)
    }
  })

  if (new_urls.length !== 0) {
    fs.writeFile(
      '../datasources/new_urls.json',
      JSON.stringify(new_urls, null, 4),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News characters urls :')
          console.log(fs.readFileSync('../datasources/new_urls.json', 'utf8'))
        }
      }
    )
  }
}

// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
const scrap = async () => {
  const browser = await puppeteer.launch()
  await getAllUrl(browser)
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap().catch((e) => console.log(`error: ${e}`))
