const fs = require('fs')
const _ = require('lodash')

exports.handler = async function (event, context) {
  let character = null

  // Récupérer les modifications à apporter au fichier JSON
  if (!_.isEmpty(event.queryStringParameters)) {
    // Lire le fichier JSON existant
    const oldData = await fs.readFileSync('public/characters', 'utf8')

    // Recuperation du character
    const jsonOldData = JSON.parse(oldData)
    character = _.find(jsonOldData.hits, { name: event.queryStringParameters.name })

    if (!_.isEmpty(event.queryStringParameters.acquired)) {
      character.acquired = event.queryStringParameters.acquired === 'true' ? true : false
    }

    if (!_.isEmpty(event.queryStringParameters.wish)) {
      character.wish = event.queryStringParameters.wish === 'true' ? true : false
    }

    if (character.acquired) character.wish = false

    // Écrire le fichier JSON mis à jour
    await fs.writeFileSync('public/characters', JSON.stringify(jsonOldData, null, 4))
  }

  // Renvoyer une réponse au client indiquant que les modifications ont été effectuées avec succès ou non
  return {
    statusCode: character === null ? 400 : 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST'
    },
    body: JSON.stringify(character)
  }
}
