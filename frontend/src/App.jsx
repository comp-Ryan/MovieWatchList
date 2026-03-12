import { useEffect, useState } from 'react'
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
  const [movieList, setMovieList] = useState([])

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

  useEffect(() => {
    movieservices
      .getAll()
      .then(initialmovies => {
        setMovieList(initialmovies)
    })  
  }, [])

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
        {movieList.map(movie => 
          <MovieCard key={movie.id} movieData={movie} setMovieResults={setMovieResults} setShowModal={setShowModal} movieList={movieList} setMovieList={setMovieList}/>
        )}
      </div>
    </>
  )
}

export default App
