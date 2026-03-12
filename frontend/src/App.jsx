import { useState } from 'react'
import movieservices from './services/fetchmovies'
import './App.css'
import MovieModal from './components/moviemodal'
import MovieCard from './components/moviecard'

function App() {
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [movieResults, setMovieResults] = useState({})
  const test = [
    {
      "Title": "Captain America: The Winter Soldier",
      "Year": "2014",
      "imdbID": "tt1843866",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Captain America: The First Avenger",
      "Year": "2011",
      "imdbID": "tt0458339",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Captain America: Civil War",
      "Year": "2016",
      "imdbID": "tt3498820",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    },
    {
      "Title": "Captain Marvel",
      "Year": "2019",
      "imdbID": "tt4154664",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZDI1NGU2ODAtNzBiNy00MWY5LWIyMGEtZjUxZjUwZmZiNjBlXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Captain Phillips",
      "Year": "2013",
      "imdbID": "tt1535109",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMWYyNjI3ZjEtNGE5ZS00MDgxLWIzNGEtZTgzNDVlZjZjYWU5XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Captain Fantastic",
      "Year": "2016",
      "imdbID": "tt3553976",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5OTM0OTY5NF5BMl5BanBnXkFtZTgwMDcxOTQ3ODE@._V1_SX300.jpg"
    },
    {
      "Title": "Captain America: Brave New World",
      "Year": "2025",
      "imdbID": "tt14513804",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Sky Captain and the World of Tomorrow",
      "Year": "2004",
      "imdbID": "tt0346156",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTM0NDQzMDA1NF5BMl5BanBnXkFtZTcwNTU3ODAzMw@@._V1_SX300.jpg"
    },
    {
      "Title": "Captain Corelli's Mandolin",
      "Year": "2001",
      "imdbID": "tt0238112",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTA3Nzg5YzYtMDIzNy00ZmNlLWIxN2UtNTFhM2M5MmMyYmJkXkEyXkFqcGc@._V1_SX300.jpg"
    }
  ]

  const test2 = {
  "Title": "Captain America: The Winter Soldier",
  "Year": "2014",
  "Rated": "PG-13",
  "Released": "04 Apr 2014",
  "Runtime": "136 min",
  "Genre": "Action, Adventure, Sci-Fi",
  "Director": "Anthony Russo, Joe Russo",
  "Writer": "Christopher Markus, Stephen McFeely, Joe Simon",
  "Actors": "Chris Evans, Samuel L. Jackson, Scarlett Johansson",
  "Plot": "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.",
  "Language": "English, French",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar. 5 wins & 52 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "7.7/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "90%"
    },
    {
      "Source": "Metacritic",
      "Value": "70/100"
    }
  ],
  "Metascore": "70",
  "imdbRating": "7.7",
  "imdbVotes": "965,363",
  "imdbID": "tt1843866",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$259,766,572",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitted', query)
    setQuery('')
  }

  const onSearchBarChange = (e) => {
    setQuery(e.target.value)
    movieservices
      .getSearchResults(e.target.value)
      .then(data => {
        console.log(data.Response)
        if (data.Response == 'True'){
          setSearchResults(data.Search)
        }
      })
  }

  return (
    <>
      {showModal ? <MovieModal movieData={test2}/> : ""}
      <div className="search_container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={query}
            onChange={onSearchBarChange}
            placeholder="Search for movies..."
          />
          <button type="submit">Search</button>
        </form>
        {test.map(movie => 
          <MovieCard key={movie.imdbID} movieData={movie}/>
        )}
      </div>
      <div className="search_container"> 
        <div>
          <button>Watchlist</button>
          <button>RatingsList</button>
        </div>
        <input 
            type="text"
            value={query}
            onChange={onSearchBarChange}
            placeholder="Search for movies..."
          />
      </div>
    </>
  )
}

export default App
