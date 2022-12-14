import React from "react";
import { GetChord } from "../API.js";
import { useForm } from "react-hook-form";
import { API } from "aws-amplify";
import "./SearchForm.css";
import Button from "../Components/UI/Button";

const SearchForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      let chordEntries = await GetChord(data);

      await API.get("chordSearchApi", "/chords/search", {
        queryStringParameters: { chordName: data.chord },
      })
        .then((res) => {
          chordEntries = [...chordEntries, ...res];
        })
        .catch((err) => console.log(err.response.data));

      props.setResults(chordEntries);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="chord">
        <h1>How do I play...</h1>
      </label>
      <div className="search-tools">
        <input name="chord" {...register("chord")} required={true} />
        <Button className="search-form__searchbtn">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="SearchIcon"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
