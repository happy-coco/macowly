// import React, { useState, useCallback } from 'react';
import React, { useState } from 'react';
import './SearchBar.module.css';

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  /*const search = useCallback(() => {
    props.onSearch(term);
  }, [props, term]);*/

  const handleSearch = () => {
    if (term) {
      props.onSearch(term); // Trigger the search with the current term
    }
  };

  /*const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);*/

  const handleTermChange = (event) => {
    setTerm(event.target.value); // Update the search term
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="SearchBar">
      <input 
        placeholder="Enter a term"
        value={term}
        onChange={handleTermChange} 
        onKeyPress={handleKeyPress}
    />
      <button className="SearchButton" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;

