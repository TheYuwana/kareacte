import React from "react";
import { useDispatch } from 'react-redux';
import { updateSong } from '../redux/center';

function Song(props) {

    // Set states
    const dispatch = useDispatch();

    // Set selected song in the global state
    const selectSong = (song) => {
        dispatch(updateSong(song))
    };

    return (
        <div className="content-songs-song" onClick={() => { selectSong({ artist: props.artist, name: props.name }) }}>
            <h3>{props.name}</h3>
            <p>by {props.artist}</p>
        </div>
    );
}

export default Song;
