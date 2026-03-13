const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let movieList = [
    { 
      "Title": "Ex Machina",
      "id": "tt0470752",
      "Year": "2014",
      "Type": "movie",
      "rating": "3", 
      "watchlist": "true",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg"
    }
]

app.get('/api/movies', (request, response) => {
    response.json(movieList)
})

app.get('/api/movies/:id', (request, response) => {
    const id = request.params.id
    const movie = movieList.find(movie => movie.id == id)
    if (contact) {
        response.json(movie)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/movies/:id', (request, response) => {
    const id = request.params.id
    movieList = movieList.filter(movie => movie.id !== id)
    response.status(204).end()
})

app.post('/api/movies', (request, response) => {
    const body = request.body
    console.log(body)

    if ((!body.Title) || (!body.id) || (!body.rating) || (!body.watchlist) || (!body.Type) || (!body.Year) || (!body.Poster)) {
        console.log("A field is invalid/missing")
        return response.status(400).json({
            error: "A field is invalid/missing"
        })
    }

    if (movieList.some(movie => movie.id === body.id)) {
        console.log("name must be unique")
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const movie = {
        Title: body.Title,
        id: body.id,
        Year: body.Year,
        Type: body.Type,
        rating: body.rating,
        watchlist: body.watchlist,
        Poster: body.Poster
    }

    movieList = movieList.concat(movie)
    console.log("MovieList", movieList)
    response.json(movieList)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})