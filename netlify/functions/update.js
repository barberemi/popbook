const fs = require('fs')
const _ = require('lodash')

exports.handler = async function (event, context) {
  let jsonOldData = null

  // Récupérer les modifications à apporter au fichier JSON
  if (!_.isEmpty(event.queryStringParameters)) {
    // Lire le fichier JSON existant
    const oldData = await fs.readFileSync('public/wish_and_acquired.json', 'utf8')

    // Recuperation du character
    jsonOldData = JSON.parse(oldData)
    let newAcquired = null
    let newWish = null

    if (!_.isEmpty(event.queryStringParameters.wish)) {
      if (event.queryStringParameters.wish === 'true') {
        if (!_.includes(jsonOldData.wish, { name: event.queryStringParameters.name })) {
          newWish = { name: event.queryStringParameters.name }
          jsonOldData.wish.push(newWish)
        }
        _.remove(jsonOldData.acquired, { name: event.queryStringParameters.name })
      } else {
        _.remove(jsonOldData.wish, { name: event.queryStringParameters.name })
      }
    }

    if (!_.isEmpty(event.queryStringParameters.acquired)) {
      if (event.queryStringParameters.acquired === 'true') {
        if (!_.includes(jsonOldData.acquired, { name: event.queryStringParameters.name })) {
          newAcquired = { name: event.queryStringParameters.name }
          jsonOldData.acquired.push(newAcquired)
        }
        _.remove(jsonOldData.wish, { name: event.queryStringParameters.name })
      } else {
        _.remove(jsonOldData.acquired, { name: event.queryStringParameters.name })
      }
    }

    // Écrire le fichier JSON mis à jour
    await fs.writeFileSync('public/wish_and_acquired.json', JSON.stringify(jsonOldData, null, 4))
  }

  // Renvoyer une réponse au client indiquant que les modifications ont été effectuées avec succès ou non
  return {
    statusCode: jsonOldData === null ? 400 : 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST'
    },
    body: JSON.stringify(jsonOldData)
  }
}
