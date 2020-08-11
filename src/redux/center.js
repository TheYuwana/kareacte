import { createSlice } from '@reduxjs/toolkit';

// One store to rule them all. Decided to put them all in one, because it's a small app.
export const centerSlice = createSlice({
    name: 'center',
    initialState: {
        search: "",
        song: {
            name: "",
            artist: ""
        },
        lyrics: []
    },
    reducers: {
        updateSearch: (state, result) => {
            state.search = result.payload;
        },
        updateSong: (state, song) => {
            state.song = song.payload;
        },
        updateLyrics: (state, lyrics) => {
            state.lyrics = lyrics.payload;
        }
    }
});

// Expose actions
export const { updateSearch, updateSong, updateLyrics } = centerSlice.actions;

// Selectors
export const getSearch = state => state.center.search;
export const getSong = state => state.center.song;
export const getLyrics = state => state.center.lyrics;

export default centerSlice.reducer;