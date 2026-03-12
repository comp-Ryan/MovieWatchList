import { useState } from 'react'
import './moviecard.css'

const MovieCard = ({movieData}) => {
    const [heartState, setHeartState] = useState(false)
    const [watchListStatus, setWatchListStatus] = useState(false)

    const handleMouseExit = () => {
        if (!watchListStatus){
            setHeartState(false)
        }
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
                <button className="viewButton">view</button>
                <button className="likeButton" onClick={()=>setWatchListStatus(!watchListStatus)} onMouseEnter={()=>setHeartState(true)} onMouseLeave={handleMouseExit}>
                    {heartState ? <img className="heartPhoto" src="https://img.icons8.com/?size=100&id=7697&format=png&color=EA2222"/> : <img className="heartPhoto" src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"/>}
                </button>
            </div>
        </div>
    )
}

export default MovieCard