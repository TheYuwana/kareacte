import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getLyrics } from '../redux/center';

var lyricsInterval;
var sentenceCount = 0;
var finished = false;

function Lyrics() {

    // Set states
    const lyrics = useSelector(getLyrics);
    const [sentence, setSentence] = useState("");

    // Check if there is anything to render based on the lyric array
    const renderLyrics = () => {
        if (lyrics.length > 0) {
            return <p>{sentence}</p>;
        } else {
            return <p>Nothing to render</p>;
        }
    }

    // If the array is full, then show the lyrics based on the given interval
    if (lyrics.length > 0) {

        // As long as the count is below the lyrics count, then show a sentence based on the current count
        if (sentenceCount < lyrics.length && !finished) {
            clearInterval(lyricsInterval);
            lyricsInterval = setInterval(() => {
                // Each empty entry shows dots
                setSentence(lyrics[sentenceCount] === "" ? "..." : lyrics[sentenceCount]);
                // Up the sentence count after each interval
                sentenceCount++;
            }, 500)
        } else {
            // When the count is above the lyric length and not finished, then set to finished and set the final sentence.
            if (!finished) {
                finished = true;
                clearInterval(lyricsInterval);
                setSentence("---- FIN ----");
            }
        }
    }

    return (
        <div className="content-lyrics">
            {renderLyrics()}
        </div>
    );
}

export default Lyrics;
