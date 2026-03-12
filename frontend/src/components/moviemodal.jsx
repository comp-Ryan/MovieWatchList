import { useState } from 'react'
import './modal.css'
// Need to add set out modal and set in modal
const MovieModal = ({movieData, setShowModal}) => {
    const [starState, setStarState] = useState([false,false,false,false,false])

    const highlightStars = (id) => {
        console.log(id)
        console.log(starState.map((val, index) => (index < id)))
        setStarState(starState.map((val, index) => (index < id)))
    }

    const reset = () => {
        setStarState([false,false,false,false,false])
        console.log('reset')
    }

    return (
    <div className="modal_container">
        <button className='exit' onClick={()=>setShowModal(false)}>X</button>
        <div className="modal">
          <div className="modal_poster_container"> 
            <img src={movieData.Poster} className="modal_poster"/>
            <div className="stars">
                {[1,2,3,4,5].map(star => (
                    <button className="star_container" key={star} onMouseEnter={() => highlightStars(star)} onMouseLeave={reset}> 
                        {starState[star-1] ? <img className="star" src="https://img.icons8.com/?size=100&id=7856&format=png&color=FFC826"/> : <img className="star" src="https://img.icons8.com/?size=100&id=104&format=png&color=000000"/> }
                    </button> 
                ))}
            </div>
            <div>
                <button>Submit</button>
                <button>Reset</button>
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