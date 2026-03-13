const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let movieList = []

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

app.put('/api/movies/:id', (request, response) => {
    const body = request.body
    console.log('body', body)

    if ((!body.Title) || (!body.id) || (!body.rating) || (!body.watchlist) || (!body.Type) || (!body.Year) || (!body.Poster)) {
        console.log("A field is invalid/missing")
        return response.status(400).json({
            error: "A field is invalid/missing"
        })
    }

    if (movieList.some(movie => movie.id === body.id)) {
        movieList = movieList.map(movie => movie.id === body.id ? body : movie)
        response.json(movieList)
    } else {
        return response.status(400).json({
            error: "ID must exist in watchlist"
        })
    }
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