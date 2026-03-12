import { useState } from 'react'
import './modal.css'
// Need to add set out modal and set in modal
const MovieModal = ({movieData}) => {
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
        <button className='exit'>X</button>
        <div className="modal">
          <div className="modal_poster_container"> 
            <img src={movieData.Poster} className="modal_poster"/>
            <div className="stars">
                {[1,2,3,4,5].map(star => (
                    <button className="star_container" key={star} onMouseEnter={() => highlightStars(star)} onMouseLeave={reset}> 
                        {starState[star-1] ? <img className="star" src="https://img.icons8.com/?size=100&id=104&format=png&color=FFC100"/> : <img className="star" src="https://img.icons8.com/?size=100&id=104&format=png&color=000000"/> }
                    </button> 
                ))}

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
              <div style={{display:'flex', alignItems: 'center'}}>
                <img src='https://img.icons8.com/?size=100&id=YaSzxFsOJh3a&format=png&color=000000' className="modal_logos"/>
                <div style={{marginLeft:'5px'}}>{movieData.Ratings[2].Value}</div>
              </div>
              <div style={{display:'flex', alignItems: 'center'}}>
                <img src='https://img.icons8.com/?size=100&id=12246&format=png&color=000000' className="modal_logos"/>
                <div style={{marginLeft:'5px'}}>{movieData.Ratings[0].Value}</div>
              </div>
              <div style={{display:'flex', alignItems: 'center'}}>  
                <img src='https://img.icons8.com/?size=100&id=58560&format=png&color=000000' className="modal_logos"/>
                <div style={{marginLeft:'5px'}}>{movieData.Ratings[1].Value}</div>
              </div>
            </div>
            
            <div>{movieData.Genre}</div>
          </div>
        </div>
      </div>
    )
}

export default MovieModal