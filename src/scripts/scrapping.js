const puppeteer = require('puppeteer')
const fs = require('fs')
const _ = require('lodash')
const knows_urls = require('../datasources/knows_urls.json')
const new_urls = require('../datasources/new_urls.json')

// 1 - Initialize arrays
const banners = []
const characters = []
const logos = []
const thumbs = []

// 2 - Récupération des URLs de toutes les pages à visiter
const getAllUrl = async (browser) => {
  const new_urls = []
  // const result = [
  // { href: 'https://www.placedespop.com/figurines-funko-pop/halo/02525-master-chief-1/7293' },
  // { href: 'https://www.placedespop.com/figurines-funko-pop/halo/02525' },
  // { href: 'https://www.placedespop.com/figurines-funko-pop/halo/liste-par-annee/02525' },
  //   {
  //     href: 'https://www.placedespop.com/figurines-funko-pop/mercredi/68293-mercredi-addams-diamant-1311/15246'
  //   }
  // ]
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

  // if (!knows_urls.includes(link.href)) {
  //   new_urls.push(link.href)
  //   return true
  // } else {
  //   return false
  // }

  // if (new_urls.length !== 0) {
  fs.writeFile(
    '../datasources/new_urls.json',
    // JSON.stringify(new_urls),
    JSON.stringify(result),
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
  // }

  return result
}

// 3 - Récupération des infos du personnage
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(url)
  await page.waitForTimeout('body')
  const evaluate = await page.evaluate(() => {
    // let name = 'le-seigneur-des-anneaux-635-elrond-1'
    // let label = 'ELRDON'
    // let title = 'le-seigneur-des-anneaux'
    // let title_label = 'Le seigneur des anneaux'
    // let num = '635'
    // let funko_id = '33254'
    // let acquired = false
    // let wish = false
    // let release_date = '2022-10-01'
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
    let acquired = false
    let wish = false
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
      ' > ' +
      name +
      '.jpg'
    // let character =
    //   'wget static.thegeekstuff.com/wp-content/uploads/2009/10/15-wget-examples-300x257.png'
    let logo =
      'wget -nc -cO - ' + document.querySelector('img.prodf-logo-img').src + ' > ' + title + '.png'
    // let logo = 'wget static.thegeekstuff.com/wp-content/uploads/2009/10/15-wget-examples-300x257.png'
    let banner =
      'wget -nc -cO - ' + document.querySelector('div.bans > img').src + ' > ' + title + '.jpg'
    // let banner = 'wget https://static.thegeekstuff.com/images/free-small.png'
    let thumb =
      'wget -nc -cO - https://www.placedespop.com/img/licences/thumbs/' +
      title +
      '-image_240x170.jpg' +
      ' > ' +
      title +
      '.jpg'
    // let thumb = 'wget https://static.thegeekstuff.com/images/free-small.png'

    return {
      name,
      label,
      title,
      title_label,
      num,
      release_date,
      funko_id,
      acquired,
      wish,
      character,
      logo,
      banner,
      thumb
    }
  })

  characters.push(evaluate.character)
  logos.push(evaluate.logo)
  banners.push(evaluate.banner)
  thumbs.push(evaluate.thumb)

  console.log('Personnage :' + evaluate.name)

  return _.omit(evaluate, ['character', 'logo', 'banner', 'thumb'])
}

// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
const scrap = async () => {
  const browser = await puppeteer.launch()
  // const urlList = await getAllUrl(browser)
  const urlList = []
  for (let i = 0; i < 200; i++) {
    urlList.push(new_urls[i])
  }
  const results = await Promise.all(urlList.map((url) => getDataFromUrl(browser, url)))
  browser.close()

  return results
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then((value) => {
    // 5-1 : banners
    fs.writeFile(
      '../../public/images/banners/0-img-banners-script.txt',
      JSON.stringify(_.uniq(banners)),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News banners images :')
          console.log(
            fs.readFileSync('../../public/images/banners/0-img-banners-script.txt', 'utf8')
          )
        }
      }
    )
    // 5-2 : characters
    fs.writeFile(
      '../../public/images/characters/0-img-characters-script.txt',
      JSON.stringify(_.uniq(characters)),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News characters images :')
          console.log(
            fs.readFileSync('../../public/images/characters/0-img-characters-script.txt', 'utf8')
          )
        }
      }
    )
    // 5-3 : logos
    fs.writeFile(
      '../../public/images/logos/0-img-logos-script.txt',
      JSON.stringify(_.uniq(logos)),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News logos images :')
          console.log(fs.readFileSync('../../public/images/logos/0-img-logos-script.txt', 'utf8'))
        }
      }
    )
    // 5-4 : thumbs
    fs.writeFile(
      '../../public/images/thumbs/0-img-thumbs-script.txt',
      JSON.stringify(_.uniq(thumbs)),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('News thumbs images :')
          console.log(fs.readFileSync('../../public/images/thumbs/0-img-thumbs-script.txt', 'utf8'))
        }
      }
    )

    // 5-5 : insert characters data
    fs.writeFile(
      'new_characters.json',
      JSON.stringify(value),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('Nouveaux characters ajoutes :')
          console.log(fs.readFileSync('new_characters.json', 'utf8'))
        }
      }
    )
  })
  .catch((e) => console.log(`error: ${e}`))
