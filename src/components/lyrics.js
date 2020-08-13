import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getLyrics } from '../redux/center';
import StyleUtils from '../styles/utils.module.scss'

var speed = 100;
var lyricsInterval;
var sentenceCount = 80;
var finished = false;
var newSentence = true;
var wordCount = 0;

// TODO: REDO THIS COMPLETELY, FLOW CURRENTLY DOES NOT MAKE SENSE

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

        // Highlight words from start to finish
        // let sentenceToHiglight = sentenceArr.slice(0, wordCount).join(" ");
        // let rest = sentenceArr.slice(wordCount, sentenceArr.length).join(" ")
        // let higlighted = <><span className={StyleUtils.red}>{sentenceToHiglight}</span> {rest}</>;
        // setSentence(higlighted);

        // Highlight words seperately
        var result = sentenceArr.map((v, k) => {
            let result = (k === wordCount) ? <><span className={StyleUtils.red}>{v}</span> </> : <>{v} </>
            return <span key={k}>{result}</span>;
        });
        wordCount++;
        setSentence(result);
    };

    // If the array is full, then show the lyrics based on the given interval
    if (lyrics.length > 0) {

        // As long as the count is below the lyrics count, then show a sentence based on the current count

        console.log(`${sentenceCount} / ${lyrics.length}`)

        if (sentenceCount < lyrics.length && !finished) {
            if (newSentence) {
                clearInterval(lyricsInterval);
                lyricsInterval = setInterval(() => {

                    if (lyrics[sentenceCount] === "") {
                        newSentence = true;
                        wordCount = 0;
                        sentenceCount++;
                        setSentence("...");
                    } else {
                        if (sentenceCount < lyrics.length) {
                            newSentence = false;
                            wordCount = 0;
                            highlightLyric(lyrics[sentenceCount].split(" "));
                        } else {
                            wordCount++;
                        }
                    }
                }, speed)
            } else {

                let sentence = lyrics[sentenceCount].split(" ");

                console.log(`${wordCount} / ${sentence.length}`)

                if (wordCount <= sentence.length) {
                    clearInterval(lyricsInterval);
                    lyricsInterval = setInterval(() => {
                        if (sentenceCount < lyrics.length) {
                            highlightLyric(lyrics[sentenceCount].split(" "));
                        } else {
                            wordCount++;
                        }
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
                console.log("DONE!!!!!");
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
