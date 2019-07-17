const TOKEN = process.env.TOKEN ? process.env.TOKEN : ''

const headers = {
  Authorization: `Basic ${TOKEN}`,
  Accept: 'application/vnd.github.symmetra-preview+json',
  'Content-Type': 'application/json'
}

// permits GET requests
if (!TOKEN) {
  delete headers['Authorization']
}

const axios = require('axios').create({
  baseURL: 'https://api.github.com',
  headers: headers
})

const table = {
  bug: {
    name: 'bug',
    color: 'd73a4a',
    description: "Something isn't working"
  },
  enhancement: {
    name: 'enhancement',
    color: 'a2eeef',
    description: 'New feature or request'
  }
}

const renameTable = {
  erro: table.bug,
  melhoria: table.enhancement,
  'feature-request': table.enhancement
}

const changeLabelsTable = renameTable

module.exports = {
  table: table,
  renameTable: renameTable,
  changeLabelsTable: changeLabelsTable,
  axios: axios
}
