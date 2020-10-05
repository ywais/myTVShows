import React, { useState, useEffect } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios';

function Home() {
  const [shows, setShows] = useState([]);
  const [searchParam, setSearchParam] = useState([]);

  useEffect(() => {
    const getTop20 = async () => {
      const { data } = await axios.get('https://www.episodate.com/api/most-popular');
      setShows(data.tv_shows);
    };
    getTop20();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if(searchParam) {
      const { data } = await axios.get(`https://www.episodate.com/api/search?q=${searchParam}`);
      setShows(data.tv_shows);
    } else {
      const { data } = await axios.get('https://www.episodate.com/api/most-popular');
      setShows(data.tv_shows);
    }
  }

  return (
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>
      <form>
        <input id='search-bar' onChange={(event) => setSearchParam(event.target.value)}></input>
        <button id='submit-btn' onClick={handleSearch}>Search</button>
      </form>
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
  );
}

export default Home;
