import React, { useState } from "react";
import LyricAPI from '../LyricApi'
import { useSelector } from 'react-redux';
import { getSearch } from '../redux/center';
import Song from './song'

// Using booleans to prevent infinite rerenders
var searchTimer;
var doneSearching = true;
var doneRendering = false;

function Songs() {

    // Set states
    const search = useSelector(getSearch);
    const [songs, setArtistsFound] = useState([]);

    // Map the list the songs into jsx for rendering
    const renderSongs = () => {
        if (doneSearching && !doneRendering) {
            doneRendering = true;
            return songs.map((song, i) => {
                return <Song key={i} name={song.name} artist={song.artist} />;
            });
        }
    };

    // Looks for songs based on user input
    // Reacts on the search state and fires when the search is not empty.
    // To prevent constant requests, there is a timeout set to every second. 
    // That gives the app the chance for the user to type and not sent a request with every key press.
    if (search !== "" && search !== undefined && doneRendering) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            doneSearching = false;
            doneRendering = false;
            LyricAPI.searchSong(search).then(response => {
                doneSearching = true;
                setArtistsFound(response.data.results.trackmatches.track);
                clearTimeout(searchTimer);
            }).catch(error => {
                console.log("Someting went wrong");
                doneSearching = true;
                clearTimeout(searchTimer);
            });
        }, 1000);
    }

    // Render
    return (
        <div className="content-songs">
            {renderSongs()}
        </div>
    );
}

export default Songs;
