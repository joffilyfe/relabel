const { renameTable, axios } = require('./config')

/**
 * fetch repository labels
 * @param {*} data
 */
const fetchLabels = async (data) => {
  const { repo, owner } = data
  const response = await axios.get(`/repos/${owner}/${repo}/labels`)
  return { labels: response.data, ...data }
}

/**
   * filter labels to update
   * @param {*} data
   */
const filterToUpdate = async (data) => {
  const { labels } = data
  const filtered = labels.filter(label => Object.keys(renameTable).includes(label.name.toLowerCase()))

  return { labels, filtered, ...data }
}

/**
   * create objects to use as payload during labels update
   * @param {*} data
   */
const makeObjectsLabelsToUpdate = async (data) => {
  const labels = data.filtered.map(label => {
    return { currentName: label.name, ...renameTable[label.name.toLowerCase()] }
  })
  return { ...data, toUpdate: labels }
}

/**
   * update custom github labels with their correspondent
   * data based on `renameTable`
   * @param {*} data
   */
const updateLabels = async (data) => {
  const { toUpdate, owner, repo } = data
  const errors = []

  const promises = toUpdate.map(async (label) => {
    const { currentName, ...payload } = label

    try {
      await axios.patch(`https://api.github.com/repos/${owner}/${repo}/labels/${currentName}`, payload)
    } catch (error) {
      errors.push({ currentName: currentName, response: error.response })
    }
  })

  await Promise.all(promises)

  return { ...data, errors: errors }
}

/**
   * Example of renaming labels in one repository

    fetchLabels({ owner: 'user', repo: 'repository' })
    .then(filterToUpdate)
    .then(makeObjectsLabelsToUpdate)
    .then(updateLabels)
    .catch(error => {
      console.log(error)
    })
*/

module.exports = {
  fetchLabels: fetchLabels,
  filterToUpdate: filterToUpdate,
  makeObjectsLabelsToUpdate: makeObjectsLabelsToUpdate,
  updateLabels: updateLabels
}
