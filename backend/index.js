const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let movieList = [
    // { 
    //   "id": "1",
    //   "name": "Arto Hellas", 
    //   "number": "040-123456"
    // },
]

app.get('/api/movies', (request, response) => {
    response.json(movieList)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})