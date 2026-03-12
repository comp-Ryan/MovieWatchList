import axios from 'axios'

const baseUrl = '/api/movies'
const apiKey = import.meta.env.VITE_OMBd_API_key


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getMovie = (query) => {
  console.log('fetching results for', query, '...')
  const request =  axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`) 
  return request.then(response => response.data)

}

const getSearchResults = (query) => {
  console.log('fetching all results for', query, '...')
  const request =  axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  getSearchResults: getSearchResults,
  getMovie:getMovie
}