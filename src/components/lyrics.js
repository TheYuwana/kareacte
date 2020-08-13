import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getLyrics } from '../redux/center';
import StyleUtils from '../styles/utils.module.scss'

var speed = 100;
var lyricsInterval;
var sentenceCount = 0;
var finished = false;
var newSentence = true;
var wordCount = 0;

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

    const highlightLyric = (sentenceArr) => {
        let sentenceToHiglight = sentenceArr.slice(0, wordCount).join(" ");
        let rest = sentenceArr.slice(wordCount, sentenceArr.length).join(" ")
        let higlighted = <><span className={StyleUtils.red}>{sentenceToHiglight}</span> {rest}</>;
        wordCount++;

        // if()
        // setSentence((sentenceToHiglight !== "") ? higlighted : "");
        setSentence(higlighted);
    };

    // If the array is full, then show the lyrics based on the given interval
    if (lyrics.length > 0) {

        // As long as the count is below the lyrics count, then show a sentence based on the current count
        if (sentenceCount < lyrics.length && !finished) {
            if (newSentence) {
                clearInterval(lyricsInterval);
                lyricsInterval = setInterval(() => {

                    if (lyrics[sentenceCount] === "") {
                        newSentence = true;
                        wordCount = 1;
                        sentenceCount++;
                        setSentence("...");
                    } else {
                        if (sentenceCount < lyrics.length) {
                            let sentenceArr = lyrics[sentenceCount].split(" ");
                            newSentence = false;
                            highlightLyric(sentenceArr);
                        }
                    }

                }, speed)
            } else {

                let sentenceArr = lyrics[sentenceCount].split(" ");

                if (wordCount <= sentenceArr.length) {
                    clearInterval(lyricsInterval);
                    lyricsInterval = setInterval(() => {
                        highlightLyric(sentenceArr);
                    }, speed)
                } else {
                    wordCount = 0;
                    sentenceCount++;
                    newSentence = true;
                }
            }

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
