const { changeLabelsTable, axios } = require('./config')
const { getNextPage } = require('./utils')
const headers = {
  Accept: 'application/vnd.github.symmetra-preview+json',
  'Content-Type': 'application/json'
}

const fetchIssues = async (data) => {
  // GET /repos/:owner/:repo/issues?state=open&page=1
  const { owner, repo, token } = data
  const page = data.page ? data.page : 1
  const issues = data.issues ? data.issues : []

  if (!!token) {
    headers['Authorization'] = `Basic ${token}`
  }

  const response = await axios.get(`/repos/${owner}/${repo}/issues?state=open&page=${page}`, {
    headers: headers
  })

  const nextPage = getNextPage(response)

  issues.push(...response.data)
  data = { ...data, page: nextPage, issues: issues }

  if (!nextPage) return data
  return fetchIssues(data)
}

const filterIssuesToUpdateLabels = async (data) => {
  const forbiddenLabels = Object.keys(changeLabelsTable)

  const issues = data.issues
    .filter(issue => {
      const labels = issue.labels.filter(label => forbiddenLabels.includes(label.name.toLowerCase()))
      return labels.length > 0
    })

  return { ...data, issuesToUpdate: issues }
}

const updateLabelsOnIssues = async (data) => {
  // PUT /repos/:owner/:repo/issues/:issue_number/labels
  const { owner, repo, token } = data

  if (!!token) {
    headers['Authorization'] = `Basic ${token}`
  }

  const promises = data.issuesToUpdate.map(async (issue) => {
    const currentLabels = issue.labels.map(label => label.name)
    const labels = currentLabels.map(label => {
      return changeLabelsTable[label.toLowerCase()] ? changeLabelsTable[label.toLowerCase()].name : label
    })

    const response = await axios.put(`/repos/${owner}/${repo}/issues/${issue.number}/labels`, {
      labels: labels
    }, {
      headers: headers
    })

    return `#${issue.number} - ${issue.title}, labels ${currentLabels} -> ${labels}`
  })

  const issuesChanged = await Promise.all(promises)

  return { ...data, errors: [], issuesChanged: issuesChanged }
}

module.exports = {
  fetchIssues: fetchIssues,
  filterIssuesToUpdateLabels: filterIssuesToUpdateLabels,
  updateLabelsOnIssues: updateLabelsOnIssues
}
