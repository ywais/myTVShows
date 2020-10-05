import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios';

function OneShow() {
  const [showDetails, setShowDetails] = useState({});
  const [currentLike, setCurrentLike] = useState('');
  const { id } = useParams(); //this is the selected show id

  useEffect(() => {
    const getShowDetails = async () => {
      const { data } = await axios.get(`https://www.episodate.com/api/show-details?q=${id}`);
      setShowDetails(data.tvShow);
      setCurrentLike(localStorage.getItem(id));
    };
    getShowDetails();
  }, [currentLike]);

  const handleClick = () => {
    if(currentLike === 'liked') {
      localStorage.setItem(id, 'not liked')
      setCurrentLike('not liked')
    } else {
      localStorage.setItem(id, 'liked')
      setCurrentLike('liked')
    }
  }

  const rating = showDetails.rating && showDetails.rating.slice(0,3);

  return (
    showDetails.name ?
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          a lt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      <div className='like-div' onClick={handleClick}>
        <img
          className='interaction-img'
          src={currentLike==='liked' ? likedImg : notLikedImg}
          alt={currentLike ? currentLike : 'not liked'}>
        </img>
      </div>
      <div className='one-show-img-and-title'>
        <h2>{showDetails.name}</h2>
        <img className='one-show-img' src={showDetails.image_path} alt="show's cover"></img>
        <div className='one-show-footer'>
          <div className='seasons'>
            {showDetails.episodes && showDetails.episodes.length > 0
            ? showDetails.episodes[showDetails.episodes.length-1].season + ' seasons' : ''}
          </div>
          <div className='genres'>
            {showDetails.genres && showDetails.genres.length > 0
            ? showDetails.genres.map(genre => <span className='genre'>{genre}</span>) : ''}
          </div>
          <div className='rating'>
            <span className={rating >= 8 ? 'green' : rating >= 6 ? 'yellow' : 'red'}>{rating}</span>
          </div>
          <div className='show-status'>
            <span className='status'>{showDetails.status}</span>
          </div>
        </div>
      </div>
      <div className='one-show-description'>
        <h2>description: </h2>
        {showDetails.description}
      </div>
    </div>
    : ''
  );
}

export default OneShow;
