import React from "react";
import "./ResultGrid.css";
import Card from "./Card";

const ResultGrid = (props) => {
  return (
    <div className="grid-container">
      {props.isSubmitted ? (
        props.results && props.results.length > 0 ? (
          props.results.map((chord) => {
            return (
              <Card
                key={chord.voicingID}
                chordName={chord.chordName}
                strings={chord.strings}
              ></Card>
            );
          })
        ) : (
          <h1>{props.loading ? "Loading..." : "No results 😥"}</h1>
        )
      ) : null}
    </div>
  );
};

export default ResultGrid;
