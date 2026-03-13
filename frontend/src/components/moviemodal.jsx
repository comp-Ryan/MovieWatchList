import { useState, useEffect } from 'react'
import movieservices from '../services/fetchmovies'
import './modal.css'
// Need to add set out modal and set in modal
const MovieModal = ({movieData, setShowModal, movieList, setMovieList}) => {
    const [starState, setStarState] = useState([false,false,false,false,false])
    const [clickedStarState, setClickedStarState] = useState([false,false,false,false,false])
    const [clickedState, setClickedState] = useState(false)
    const [starLock, setStarLock] = useState(false)

    useEffect(()=>{
        const existingMovie = movieList.find(movie => movie.Title == movieData.Title)
        if (existingMovie && existingMovie.rating !== 'none') {
            console.log(existingMovie.rating)
            setStarLock(true)
            setClickedState(true)
            setStarState(starState.map((star, index) => index < existingMovie.rating ? true : star))
            setClickedStarState(starState.map((star, index) => index < existingMovie.rating ? true : star))
        }
    }, [movieList])

    const highlightStars = (id) => {
        if (!starLock){
            setStarState(starState.map((val, index) => (index < id)))
        }
    }

    const reset = () => {
        if (!clickedState){
            setStarState([false,false,false,false,false])
            console.log('reset')
        } else {
            setStarState(clickedStarState)
        }
    }

    const handleClick = (id) => {
        setClickedStarState(starState.map((val, index) => (index < id)))
        setClickedState(true)
    }

    const handleSubmit = () => {
        let stars = 0;
        if (clickedState){
            stars = clickedStarState.filter(star => star !== false).length
        } 

        const backendMovieData = movieList.find(movie => movie.id == movieData.imdbID)
        console.log(backendMovieData)

        if (backendMovieData) {
            const movie = {
                Title: backendMovieData.Title,
                id: backendMovieData.id,
                Year: backendMovieData.Year,
                Type: backendMovieData.Type,
                rating: stars,
                watchlist: backendMovieData.watchlist,
                Poster: backendMovieData.Poster
            }

            movieservices
                .updateMovie(movieData.imdbID, movie)
                .then(data => {
                    console.log(data)
                    setMovieList(data)
                })
        } else {
            const movie = {
                Title: movieData.Title,
                id: movieData.imdbID,
                Year: movieData.Year,
                Type: movieData.Type,
                rating: stars,
                watchlist: 'false',
                Poster: movieData.Poster
            }

            movieservices
                .addMovie(movie)
                .then(data => {
                    setMovieList(data)
                })
        }
        setStarLock(true)
    }

    const handleDelete = () => {
        movieservices
            .deleteMovie(movieData.imdbID)
        setMovieList(movieList.filter(movie => movie.id !== movieData.imdbID))
        setShowModal(false)
    } 

    const handleReset =() => {
        setClickedState(false)
        setStarState([false,false,false,false,false])
        setClickedStarState([false,false,false,false,false])
        const backendMovieData = movieList.find(movie => movie.id == movieData.imdbID)

        if (backendMovieData) {
            const movie = {
                Title: backendMovieData.Title,
                id: backendMovieData.id,
                Year: backendMovieData.Year,
                Type: backendMovieData.Type,
                rating: 'none',
                watchlist: backendMovieData.watchlist,
                Poster: backendMovieData.Poster
            }

            movieservices
                .updateMovie(movieData.imdbID, movie)
                .then(data => {
                    console.log(data)
                    setMovieList(data)
                })
        } 
    }

    return (
    <div className="modal_container">
        <button className='exit' onClick={()=>setShowModal(false)}>X</button>
        <div className="modal">
          <div className="modal_poster_container"> 
            <img src={movieData.Poster} className="modal_poster"/>
            <div className="stars">
                {[1,2,3,4,5].map(star => (
                    <button className="star_container" key={star} onMouseEnter={() => highlightStars(star)} onMouseLeave={reset} onClick={()=>handleClick(star)}> 
                        {starState[star-1] ? <img className="star" src="https://img.icons8.com/?size=100&id=7856&format=png&color=FFC826"/> : <img className="star" src="https://img.icons8.com/?size=100&id=104&format=png&color=000000"/> }
                    </button> 
                ))}
            </div>
            <div>
                {starLock ? <button onClick={()=> {
                    setStarLock(false)
                }}>Edit</button> : <button onClick={handleSubmit}>Submit</button>  }
                {starLock ? '' : <button onClick={handleReset}>Reset</button> }

                <button onClick={handleDelete}>Delete</button>
            </div>
            
          </div>
          <div className="modal_information">
            <div className="title">{movieData.Title}</div>
            <div className="base">Released: {movieData.Released}</div>
            <div className="base">Rated: {movieData.Rated}</div>
            <div className="base">Runtime: {movieData.Runtime}</div>
            <div className="base">Writers: {movieData.Writer}</div>
            <div className="base">Actors: {movieData.Actors}</div>
            <div className="base">{movieData.Plot}</div>
            <div>
                Ratings
                {movieData.Ratings && movieData.Ratings.map(rate => {
                    let link;
                    if (rate.Source == "Internet Movie Database") {
                        link = "https://img.icons8.com/?size=100&id=12246&format=png&color=000000"
                    } else if (rate.Source == "Rotten Tomatoes"){
                        link = "https://img.icons8.com/?size=100&id=58560&format=png&color=000000"
                    } else if (rate.Source == "Metacritic") {
                        link = "https://img.icons8.com/?size=100&id=YaSzxFsOJh3a&format=png&color=000000"
                    }
                    return (
                    <div key={rate.Source} style={{display:'flex', alignItems: 'center'}}>
                        <img src={link} className="modal_logos"/>
                        <div style={{marginLeft:'5px'}}>{rate.Value}</div>
                    </div>)
                })}
            </div>
            
            <div>{movieData.Genre}</div>
          </div>
        </div>
      </div>
    )
}

export default MovieModal