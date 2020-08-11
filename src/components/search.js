import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateSearch, getSearch } from '../redux/center';

export default function SearchInput(_props) {

    // Set states
    const dispatch = useDispatch();
    const search = useSelector(getSearch);
    const [value, setValue] = useState(search);

    // Set the search value, each time the input has changes
    const handleChange = (value) => {
        // Set component value
        setValue(value);

        // Set in redux
        dispatch(updateSearch(value))
    };

    // Prevent submit when user presses "enter". The submit refreshes the page
    return (
        <div className="content-search">
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <input
                    value={value}
                    type="text"
                    onChange={e => handleChange(e.target.value)}
                    placeholder="Search for an artist" />
            </form>
        </div>
    );
}