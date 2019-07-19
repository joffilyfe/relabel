#!/usr/bin/env node
const program = require('commander')
const { fetchIssues, filterIssuesToUpdateLabels, updateLabelsOnIssues } = require('../src/issues')

program
  .option('-r, --repo <name>', 'Set the repository where actions will be performed')
  .option('-o, --owner <name>', 'Set the repository owner')
  .option('-t, --token <personal github token>', 'Set your personal github token')
  .parse(process.argv)
  // TODO: add support for filters

const options = program.opts()

if (!options.repo || !options.owner) {
  console.error('Error: a repository and owner is required')
  program.outputHelp()
  process.exit(1)
}

if (!options.token && !process.env.token) {
  console.error('Error: to perform changes your must set a personal token, see: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line')
  console.error('you can alse use envirioment variable `token` to the this information.')
  process.exit(1)
}

options.token = options.token || process.env.token


fetchIssues({ owner: options.owner, repo: options.repo, token: options.token })
  .then(filterIssuesToUpdateLabels)
  .then(updateLabelsOnIssues)
  .then(data => {
    data.errors.forEach(error => {
      console.log(`current-name: ${error.currentName} - code: ${error.response.status} - ${error.response.statusText}`)
    })
    data.issuesChanged.forEach(issue => {
        console.log(issue)
    })

    return data
  })
  .catch(error => {
    const { response } = error
    if (response) {
      console.log(`${response.status} - ${response.statusText}`)
    }
  })
