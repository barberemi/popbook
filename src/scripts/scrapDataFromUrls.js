const puppeteer = require('puppeteer')
const fs = require('fs')
const _ = require('lodash')
const new_urls = require('../datasources/new_urls.json')

// 1 - Initialize arrays
const allScripts = []

// 3 - Récupération des infos du personnage
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(url)
  await page.waitForTimeout('body')
  const evaluate = await page.evaluate(() => {
    let nameTitle = document
      .querySelector('li:nth-child(7)[itemprop="itemListElement"] > a[itemprop="item"]')
      .id.split('/')
    let name = nameTitle[3]
    let label = document.querySelector('.prodf-libelle').firstChild.data.toUpperCase()
    let title = nameTitle[2]
    let title_label = document.querySelector('span[itemprop="category"]').innerText
    let num = document.querySelector('.prodf-num')
      ? document.querySelector('.prodf-num').innerText
      : null
    let funko_id = document.querySelector('span[itemprop="model"]')
      ? document.querySelector('span[itemprop="model"]').innerText
      : null
    let year = document.querySelector('span[itemprop="releaseDate"]').innerText
    let month = document.querySelector('.prodf-infos > li:nth-child(3)').childNodes[1].data
    let release_date = year + '-00-01'

    if (month) {
      switch (month.trim()) {
        case 'Janvier':
        case 'janvier':
          release_date = year + '-01-01'
          break
        case 'Février':
        case 'Fevrier':
        case 'février':
        case 'fevrier':
          release_date = year + '-02-01'
          break
        case 'Mars':
        case 'mars':
          release_date = year + '-03-01'
          break
        case 'Avril':
        case 'avril':
          release_date = year + '-04-01'
          break
        case 'Mai':
        case 'mai':
          release_date = year + '-05-01'
          break
        case 'Juin':
        case 'juin':
          release_date = year + '-06-01'
          break
        case 'Juillet':
        case 'juillet':
          release_date = year + '-07-01'
          break
        case 'Août':
        case 'Aout':
        case 'août':
        case 'aout':
          release_date = year + '-08-01'
          break
        case 'Septembre':
        case 'septembre':
          release_date = year + '-09-01'
          break
        case 'Octobre':
        case 'octobre':
          release_date = year + '-10-01'
          break
        case 'Novembre':
        case 'novembre':
          release_date = year + '-11-01'
          break
        case 'Décembre':
        case 'Decembre':
        case 'décembre':
        case 'decembre':
          release_date = year + '-12-01'
          break
        default:
          release_date = year + '-00-01'
          break
      }
    }

    let character =
      'wget -nc -cO - ' +
      document.querySelector('.prodf-img > span > img').src +
      ' > characters/' +
      name +
      '.jpg'
    let logo =
      'wget -nc -cO - ' +
      document.querySelector('img.prodf-logo-img').src +
      ' > logos/' +
      title +
      '.png'
    let banner =
      'wget -nc -cO - ' +
      document.querySelector('div.bans > img').src +
      ' > banners/' +
      title +
      '.jpg'
    let thumb =
      'wget -nc -cO - https://www.placedespop.com/img/licences/thumbs/' +
      title +
      '-image_240x170.jpg' +
      ' > thumbs/' +
      title +
      '.jpg'

    return {
      name,
      label,
      title,
      title_label,
      num,
      release_date,
      funko_id,
      character,
      logo,
      banner,
      thumb
    }
  })

  allScripts.push(evaluate.character)
  allScripts.push(evaluate.logo)
  allScripts.push(evaluate.banner)
  allScripts.push(evaluate.thumb)

  console.log('Personnage :' + evaluate.name)

  return _.omit(evaluate, ['character', 'logo', 'banner', 'thumb'])
}

// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
const scrap = async () => {
  const browser = await puppeteer.launch()
  const urlList = []
  for (let i = 0; i < 19; i++) {
    urlList.push(new_urls[i])
  }
  const results = await Promise.all(urlList.map((url) => getDataFromUrl(browser, url)))
  browser.close()

  return results
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then((value) => {
    // 5-1 : insert script download images
    fs.writeFile(
      '../../public/images/0-script-download-images.txt',
      JSON.stringify(_.uniq(allScripts), null, 4),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News scripts : OK')
        }
      }
    )

    // 5-2 : insert characters data
    fs.writeFile(
      'new_characters.json',
      JSON.stringify(value, null, 4),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('Nouveaux characters ajoutes : OK')
        }
      }
    )
  })
  .catch((e) => console.log(`error: ${e}`))
