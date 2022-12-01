import React, { useEffect, useState } from "react";
import "./SearchChords.css";
import SearchForm from "./SearchForm";
import ResultGrid from "./ResultGrid";
import AddChord from "./AddChord";
import Button from "./UI/Button";

function SearchChords() {
  const [results, setResults] = useState([]);
  const [addChord, setAddChord] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty("--secondary", "white");
      document.documentElement.style.setProperty("--main", "rgba(78, 78, 78)");
    } else {
      document.documentElement.style.setProperty("--main", "white");
      document.documentElement.style.setProperty(
        "--secondary",
        "rgba(78, 78, 78)"
      );
    }
  }, [darkMode]);

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
        <AddChord addChordSwitch={addChord} addChordHandler={addChordHandler} darkMode={darkMode} />
      )}
      <div className={`search-chords__searchbar`}>
        <Button
          className="btn-darkmode"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <svg focusable="false" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
          </svg>
        </Button>
        <SearchForm
          setResults={setResults}
          handleAddSubmit={addSubmitHandler}
          setAddChord={addChordHandler}
        />
      </div>
      {results && <ResultGrid results={results} darkMode={darkMode} />}
    </div>
  );
}

export default SearchChords;

//document.documentElement.style.setProperty('--base',this.state.color);
