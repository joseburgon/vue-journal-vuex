
import https from 'https'

const httpPromise = (urlOptions, data = '') => new Promise((resolve, reject) => {
  // Inspired from https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65
  const req = https.request(urlOptions, res => {
    // I believe chunks can simply be joined into a string
    const chunks = []

    res.on('data', chunk => chunks.push(chunk))
    res.on('error', reject)
    res.on('end', () => {
      const { statusCode, headers } = res
      const validResponse = statusCode >= 200 && statusCode <= 299
      const body = chunks.join('')

      if (validResponse) resolve({ statusCode, headers, body })
      else reject(new Error(`Request failed. status: ${statusCode}, body: ${body}`))
    })
  })

  req.on('error', reject)
  req.write(data, 'binary')
  req.end()
})


export const getMovieList = async (year) => {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/movies?Year=<year>

  const apiBaseUrl = 'https://jsonmock.hackerrank.com/api/movies'

  const response = await httpPromise(`${apiBaseUrl}?Year=${year}`)

  const data = JSON.parse(response).data

  return data.map(movie => movie.Title)
}

// const result = getMovieList(2012)
//
// console.log({result})