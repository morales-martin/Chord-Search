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
  const [windowOffset, setWindowOffset] = useState(0)

  useEffect(() => {
    if (addChord) {
      let currOffset = window.scrollY
      setWindowOffset(currOffset)
      document.body.style.top = `-${currOffset}px`;
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
      window.scrollTo(0,windowOffset)
    }
  }, [addChord]);

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
        <AddChord
          addChordSwitch={addChord}
          addChordHandler={addChordHandler}
          darkMode={darkMode}
        />
      )}
      <div className={`search-chords__searchbar ${results.length ? "" : 'center'}`}>
        <div className="modal-buttons">
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
          <Button className="add-chord__btn" onClick={addChordHandler}>
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AddIcon"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
          </Button>
        </div>
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
