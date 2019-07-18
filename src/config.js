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
  },
  duplicate: {
    name: 'duplicate',
    color: 'cfd3d7',
    description: 'This issue or pull request already exists'
  },
  'good first issue': {
    name: 'good first issue',
    color: '7057ff',
    description: 'Good for newcomers'
  },
  'help wanted': {
    name: 'help wanted',
    color: '008672',
    description: 'Extra attention is needed'
  },
  invalid: {
    name: 'invalid',
    color: 'e4e669',
    description: "This doesn't seem right",
  },
  question: {
    name: 'question',
    color: 'd876e3',
    description: 'Further information is requested'
  },
  wontfix: {
    name: 'wontfix',
    color: 'ffffff',
    description: 'This will not be worked on'
  },
  task: {
    name: 'task',
    color: 'cc9949',
    description: 'A minimal piece of work.'
  }
}

const renameTable = {
  erro: table.bug,
  melhoria: table.enhancement,
  'feature-request': table.enhancement,
  duplicado: table.duplicate,
  impedido: table.wontfix,
  'inválido': table.invalid,
  'discussão': table["help wanted"],
  bug: table.bug
}

const changeLabelsTable = renameTable

module.exports = {
  table: table,
  renameTable: renameTable,
  changeLabelsTable: changeLabelsTable,
  axios: axios
}
