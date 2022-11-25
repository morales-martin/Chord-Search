import React from "react";
import "./ResultGrid.css";
import Card from "./Card";

const ResultGrid = (props) => {
  return (
    <div className="grid-container">
      {props.results.map((chord) => {
        return (
          <Card
            key={chord.voicingID || chord._id}
            chordName={chord.chordName}
            strings={chord.strings || chord.chordStrings}
          ></Card>
        );
      })}
    </div>
  );
};

export default ResultGrid;
