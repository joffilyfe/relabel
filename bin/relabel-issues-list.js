#!/usr/bin/env node
const program = require('commander')
const { fetchIssues } = require('../src/issues')

program
  .option('-r, --repo <name>', 'Set the repository where actions will be performed')
  .option('-o, --owner <name>', 'Set the repository owner')
  .parse(process.argv)
  // TODO: add support for filters

const options = program.opts()

if (!options.repo || !options.owner) {
  console.error('Error: a repository and owner is required')
  program.outputHelp()
  process.exit(1)
}

fetchIssues({ owner: options.owner, repo: options.repo })
  .then(data => {
    data.issues.forEach(issue => {
      console.log(`#${issue.number} - ${issue.title} - ${issue.url}`)
    })
  }).catch(error => {
    const { response } = error
    if (response) {
      console.log(`${response.status} - ${response.statusText}`)
    }
  })
