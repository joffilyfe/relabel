const getNextPage = (response) => {
  var regex = new RegExp('page=(\\d+)>;{0,1} rel="next"', 'gm')

  if (!response.headers || !response.headers.link ||
        !regex.test(response.headers.link)) {
    return undefined
  }

  return response.headers.link.split(regex)[1]
}

module.exports = {
  getNextPage: getNextPage
}
