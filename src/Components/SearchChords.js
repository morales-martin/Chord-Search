import React, { useEffect, useState } from "react";
import "./SearchChords.css";
import SearchForm from "./SearchForm";
import ResultGrid from "./ResultGrid";
import AddChord from "./AddChord";

function SearchChords() {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addChord, setAddChord] = useState(false);

  useEffect(() => {}, [loading]);

  const addSubmitHandler = e => {
    e.preventDefault();
  }

  const addChordHandler = (e) => {
    e.preventDefault()
    let addSwitch = addChord ? false : true;
    setAddChord(addSwitch);
  }

  return (
    <div className="search-chords__container">
      <div className="search-chords__searchbar">
        <SearchForm
          setResults={setResults}
          setLoading={setLoading}
          setIsSubmitted={setIsSubmitted}
          handleAddSubmit={addSubmitHandler}
          setAddChord={addChordHandler}
        />
        {addChord && <AddChord addChordSwitch={addChord} setAddChord={addChordHandler}/>}
      </div>
      <ResultGrid results={results} isSubmitted={isSubmitted} />
    </div>
  );
}

export default SearchChords;
