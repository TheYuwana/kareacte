const axios = require('axios');
const lastfmApiKey = "";

const LyricAPI = {
    // Search for lyrics based on artist and song
    searchLyrics(artist, song) {
        return axios({
            url: `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`,
            method: 'get'
        })
    },
    // Get a list of songs from LastFM
    // Get a maximum of 15 results per search
    searchSong(term) {
        return axios({
            url: `http://ws.audioscrobbler.com/2.0`,
            params: {
                limit: 15,
                method: "track.search",
                track: term,
                api_key: lastfmApiKey,
                format: "json"
            },
            method: 'get'
        })
    }
}

export default LyricAPI;