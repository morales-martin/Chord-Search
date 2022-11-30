import React, { useState } from "react";
import "./SearchChords.css";
import SearchForm from "./SearchForm";
import ResultGrid from "./ResultGrid";
import AddChord from "./AddChord";

function SearchChords() {
  const [results, setResults] = useState([]);
  const [addChord, setAddChord] = useState(false);

  const addSubmitHandler = (e) => {
    e.preventDefault();
  };

  const addChordHandler = () => {
    let addSwitch = addChord ? false : true;
    setAddChord(addSwitch);
  };

  return (
    <div className="search-chords__container">
      {addChord && (
        <AddChord addChordSwitch={addChord} addChordHandler={addChordHandler} />
      )}
      <div className={`search-chords__searchbar`}>
        <SearchForm
          setResults={setResults}
          handleAddSubmit={addSubmitHandler}
          setAddChord={addChordHandler}
        />
      </div>
      {results && <ResultGrid results={results} />}
    </div>
  );
}

export default SearchChords;
