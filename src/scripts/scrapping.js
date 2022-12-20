const puppeteer = require('puppeteer')
const fs = require('fs')
const _ = require('lodash')

// 2 - Récupération des URLs de toutes les pages à visiter
const getAllUrl = async (browser) => {
  //   const page = await browser.newPage()
  //   await page.goto('https://www.placedespop.com/plan-du-site')
  //   await page.waitForTimeout('body')
  //   const result = await page.evaluate(() =>
  //     [...document.querySelectorAll('div.contenu-texte > ul > li > a[href*="/figurines-funko-pop/"]')]
  //       .filter(function (link) {
  //         return !link.href.includes('liste-par-annee') && (link.href.match(/\//g) || []).length === 6
  //       })
  //       .map((link) => link.href)
  //   )

  //   return result
  return ['https://www.placedespop.com/figurines-funko-pop/halo/02525-master-chief-1/7293']
}

// 3 - Récupération du prix et du tarif d'un livre à partir d'une url (voir exo #2)
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForTimeout('body')
  return page.evaluate(() => {
    let nameTitle = document
      .querySelector(
        'body > div.container > div > div:nth-child(7) > nav > ul > li:nth-child(7) > a'
      )
      .id.split('/')
    let name = nameTitle[3]
    let label = document.querySelector('.prodf-libelle').innerText.toUpperCase()
    let title = nameTitle[2]
    let num = document.querySelector('.prodf-num').innerText
    // let release_date
    let funko_id = document.querySelector('span[itemprop="model"]').innerText
    let acquired = false
    let wish = false

    return { name, label, title, num, funko_id, acquired, wish }
  })
}

// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
const scrap = async () => {
  const browser = await puppeteer.launch()
  const urlList = await getAllUrl(browser)
  const results = await Promise.all(urlList.map((url) => getDataFromUrl(browser, url)))
  browser.close()
  console.log(results)
  return results
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then((value) => {
    fs.readFile('test.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err)
      } else {
        var json = JSON.parse(data)
        json['hits'].push(value)
        // fs.writeFile(
        //   'test.json',
        //   JSON.stringify(json),
        //   {
        //     encoding: 'utf8'
        //   },
        //   (err) => {
        //     if (err) console.log(err)
        //     else {
        //       console.log('File written successfully\n')
        //       console.log('The written has the following contents:')
        //       console.log(fs.readFileSync('test.json', 'utf8'))
        //     }
        //   }
        // )
      }
    })
  })
  .catch((e) => console.log(`error: ${e}`))
