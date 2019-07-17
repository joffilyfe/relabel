const { fetchIssues, filterIssuesToUpdateLabels, updateLabelsOnIssues } = require('./issues')

fetchIssues({ owner: 'joffilyfe', repo: 'document-store' })
  .then(filterIssuesToUpdateLabels)
  .then(updateLabelsOnIssues)
  .then(data => {
    // inspect
    return data
  })
  .then(console.log)
  .catch(error => {
    console.log(error)
  })
