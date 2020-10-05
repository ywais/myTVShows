import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios';

function OneShow() {
  const [showDetails, setShowDetails] = useState({});
  const [currentLike, setCurrentLike] = useState('not liked');
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

  return (
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      <div className='like-div'>
        <img
          className='interaction-img'
          src={currentLike==='liked' ? likedImg : notLikedImg}
          alt={currentLike}
          onClick={handleClick}>
        </img>
      </div>
    </div>
  );
}

export default OneShow;
