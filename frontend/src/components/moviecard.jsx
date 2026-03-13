import { useState, useEffect } from 'react'
import movieservices from '../services/fetchmovies'
import './moviecard.css'

const MovieCard = ({movieData, setShowModal, setMovieResults, setMovieList, movieList}) => {
    const [heartState, setHeartState] = useState(false)
    const [watchListStatus, setWatchListStatus] = useState(false)

    useEffect(()=>{
        const existingMovie = movieList.find(movie => movie.Title == movieData.Title)
        if (existingMovie && existingMovie.watchlist === "true") {
            setHeartState(true);
            setWatchListStatus(true);
        }
        else {
            setHeartState(false);
            setWatchListStatus(false);
        }
    }, [movieList])

    const handleMouseExit = () => {
        if (!watchListStatus){
            setHeartState(false)
        }
    }

    const handleView = () => {
        movieservices
          .getMovie(movieData.Title)
          .then(data => {
            setMovieResults(data)
          })
        setShowModal(true)
    }

    const addToWatchList = () => {
        const id = movieData.imdbID ? movieData.imdbID : movieData.id
        const backendMovieData = movieList.find(movie => movie.id == id)
        if (!watchListStatus){
            console.log('1')

            const newMovie = {
                Title: movieData.Title,
                id: id,
                Year: movieData.Year,
                Type: movieData.Type,
                rating: movieData.rating ? movieData.rating : 'none',
                watchlist: 'true',
                Poster: movieData.Poster
            }

            if (backendMovieData){
                movieservices.updateMovie(id, newMovie)
                setMovieList(movieList.map(movie => movie.id == id ? newMovie : movie)) 
            } else {
                movieservices
                    .addMovie(newMovie)
                    .then(returnedMovieList => setMovieList(returnedMovieList))
            }
        }

        if (watchListStatus){
            const newMovie = {
                Title: movieData.Title,
                id: id,
                Year: movieData.Year,
                Type: movieData.Type,
                rating: movieData.rating ? movieData.rating : 'none',
                watchlist: 'false',
                Poster: movieData.Poster
            }

            movieservices.updateMovie(id, newMovie)
            setMovieList(movieList.map(movie => movie.id == id ? newMovie : movie))            
        }
        setWatchListStatus(!watchListStatus)
    }

    return (
        <div className="movieCard">
            <img src={movieData.Poster} className='poster'/>
            <div className='titleBox'>
                <div>{movieData.Title}</div>
                <div> {movieData.Year}</div>
                <div>Type: {movieData.Type}</div>
            </div>
            <div></div>
            <div className="buttonContainer">
                <button className="viewButton" onClick={handleView}>view</button>
                <button className="likeButton" onClick={addToWatchList} onMouseEnter={()=>setHeartState(true)} onMouseLeave={handleMouseExit}>
                    {heartState ? <img className="heartPhoto" src="https://img.icons8.com/?size=100&id=7697&format=png&color=EA2222"/> : <img className="heartPhoto" src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"/>}
                </button>
            </div>
        </div>
    )
}

export default MovieCard