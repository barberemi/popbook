const puppeteer = require('puppeteer')
const fs = require('fs')

// 2 - Récupération des URLs de toutes les pages à visiter
const getAllUrl = async (browser) => {
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/')
  await page.waitForTimeout('body')
  const result = await page.evaluate(() =>
    [...document.querySelectorAll('article > h3 > a')].map((link) => link.href)
  )
  return result
}

// 3 - Récupération du prix et du tarif d'un livre à partir d'une url (voir exo #2)
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForTimeout('body')
  return page.evaluate(() => {
    let label = document.querySelector('h1').innerText
    let name = document.querySelector('#default > div > div > ul > li:nth-child(3) > a').innerText
    return { name, label }
  })
}

// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
const scrap = async () => {
  const browser = await puppeteer.launch()
  const urlList = await getAllUrl(browser)
  const results = await Promise.all(urlList.map((url) => getDataFromUrl(browser, url)))
  browser.close()
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
        fs.writeFile(
          'test.json',
          JSON.stringify(json),
          {
            encoding: 'utf8'
          },
          (err) => {
            if (err) console.log(err)
            else {
              console.log('File written successfully\n')
              console.log('The written has the following contents:')
              console.log(fs.readFileSync('test.json', 'utf8'))
            }
          }
        )
      }
    })
  })
  .catch((e) => console.log(`error: ${e}`))
