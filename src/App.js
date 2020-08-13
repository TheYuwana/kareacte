import React, { useState } from "react";
import './styles/App.scss';
import SearchInput from './components/search'
import Songs from './components/songs'
import { useSelector, useDispatch } from 'react-redux';
import { getSong, updateLyrics, updateSong } from './redux/center';
import LyricAPI from './LyricApi'
import Lyrics from './components/lyrics';

// Error messages from server
const notFound = "Unfortunately, we are not licensed to display the full lyrics for this song at the moment. Hopefully we will be able to in the future. Until then... how about a random page?";

// var test = "Hey You";
// var test2 = "hey";

// console.log(test.split(" "));
// console.log(test2.split(" "));

function App() {

  // Set states
  const dispatch = useDispatch();
  const song = useSelector(getSong);

  // Using boolean states to acoid infinite re-renders
  const [searchingLyrics, setSearchingLyrics] = useState(false);
  const [lyricsFound, setLyricsFound] = useState(false);

  // Get the lyrics based on selected artist and song
  if (song.artist !== "" && !searchingLyrics && !lyricsFound) {
    setSearchingLyrics(true);
    LyricAPI.searchLyrics(song.artist, song.name).then(response => {

      // If the lyric is not found, set empty artist
      // If found, then store the lyrics globally to show them in the lyric component
      if (response.data.lyrics === notFound) {
        setLyricsFound(false);
        setSearchingLyrics(false);
        dispatch(updateSong({ artist: "", name: "" }));
      } else {
        setLyricsFound(true);
        setSearchingLyrics(false);
        dispatch(updateLyrics(response.data.lyrics.split("\n")))
      }
    }).catch(error => {
      setSearchingLyrics(false);
      setLyricsFound(false);
      dispatch(updateSong({ artist: "", name: "" }));
    });
  }

  // Show components based on booleans
  return (
    <div className="App">
      <header>
        <h1>Let's Kareacte!</h1>
      </header>
      <div className="content">
        {(!searchingLyrics && !lyricsFound) && <><SearchInput /> <Songs /></>}
        {(searchingLyrics && !lyricsFound) && <p className="message">Searching lyrics...</p>}
        {(!searchingLyrics && lyricsFound) && <Lyrics />}
      </div>
    </div>
  );
}

export default App;
