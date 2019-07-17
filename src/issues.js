const { changeLabelsTable, axios } = require('./config')
const { getNextPage } = require('./utils')

const fetchIssues = async (data) => {
  // GET /repos/:owner/:repo/issues?state=open&page=1
  const { owner, repo } = data
  const page = data.page ? data.page : 1
  const issues = data.issues ? data.issues : []

  const response = await axios.get(`/repos/${owner}/${repo}/issues?state=open&page=${page}`)
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
      const labels = issue.labels.filter(label => forbiddenLabels.includes(label.name))
      return labels.length > 0
    })

  return { ...data, issuesToUpdate: issues }
}

const updateLabelsOnIssues = async (data) => {
  // PUT /repos/:owner/:repo/issues/:issue_number/labels
  const { owner, repo } = data

  const promises = data.issuesToUpdate.map(async (issue) => {
    const currentLabels = issue.labels.map(label => label.name)
    const labels = currentLabels.map(label => {
      return changeLabelsTable[label] ? changeLabelsTable[label].name : label
    })

    const response = await axios.put(`/repos/${owner}/${repo}/issues/${issue.number}/labels`, {
      labels: labels
    })

    // unnecessary data
    return response
  })

  await Promise.all(promises)

  return data
}

module.exports = {
  fetchIssues: fetchIssues,
  filterIssuesToUpdateLabels: filterIssuesToUpdateLabels,
  updateLabelsOnIssues: updateLabelsOnIssues
}
