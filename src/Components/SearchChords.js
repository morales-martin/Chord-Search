import React, { useEffect, useState } from "react";
import "./SearchChords.css";


import SearchForm from "./SearchForm";
import ResultGrid from "./ResultGrid";

function SearchChords() {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {}, [loading]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="search-chords__container">
      <SearchForm
        setResults={setResults}
        setLoading={setLoading}
        setIsSubmitted={setIsSubmitted}
      />
      <ResultGrid results={results} isSubmitted={isSubmitted}/>
    </div>
  );
}

export default SearchChords;
