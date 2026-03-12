import { useState } from 'react'
import movieservices from './services/fetchmovies'
import './App.css'
import MovieModal from './components/moviemodal'
import MovieCard from './components/moviecard'

function App() {
  const [query, setQuery] = useState('')
  const [personalListQuery, setPersonalListQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [searchResultsStatus, setSearchResultsStatus] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [movieResults, setMovieResults] = useState({})
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
    movieservices
      .getMovie(query)
      .then(data => {
        console.log("data set", data)
        setMovieResults(data)
      })
    setShowModal(true)
  }

  const onSearchBarChange = (e) => {
    setQuery(e.target.value)
    movieservices
      .getSearchResults(e.target.value)
      .then(data => {
        console.log(data.Response)
        if (data.Response == 'True'){
          setSearchResultsStatus(true)
          setSearchResults(data.Search)
        }
        else {
          setSearchResultsStatus(false)
        }
      })
  }

  return (
    <>
      {showModal ? <MovieModal movieData={movieResults} setShowModal={setShowModal}/> : ""}
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
        {searchResultsStatus ? searchResults.map(movie => 
          <MovieCard key={movie.imdbID} movieData={movie} setMovieResults={setMovieResults} setShowModal={setShowModal}/>
        ) : "Too many results"}
      </div>
      <div className="search_container"> 
        <div>
          <button>Watchlist</button>
          <button>RatingsList</button>
        </div>
        <input 
            type="text"
            value={personalListQuery}
            onChange={(e)=>setPersonalListQuery(e.target.value)}
            placeholder="Search for movies..."
          />
      </div>
    </>
  )
}

export default App
