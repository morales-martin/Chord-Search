import "./App.css";
import SearchChords from "./Components/SearchChords";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import React from "react";

function App() {
  Amplify.configure(awsconfig);

  return (
    <React.Fragment>
      <SearchChords></SearchChords>
    </React.Fragment>
  );
}

export default App;
