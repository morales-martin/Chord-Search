import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import "./AddChord.css";
import Canvas from "./Canvas";
import { API } from "aws-amplify";

const AddChord = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [placementGrid, setPlacementGrid] = useState([]);

  Modal.setAppElement("body");

  const onSubmit = async (data) => {
    try {
      let chordStrings = new Array(6).fill(0);
      let error;

      for (let vertex of placementGrid) {
        if (vertex.isVisible) {
          chordStrings[vertex.stringPosition[0]] =
            vertex.symbol || vertex.stringPosition[1];
        }
      }

      let newChord = {
        chordName: data.chordName,
        chordStrings: chordStrings.join(" "),
      };

      await API.post("chordSearchApi", "/chords/add", { body: newChord })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          error = err.response.data;
        });

      if (!error) {
        props.addChordHandler();
      } else {
        setError(error);
      }
    } catch {
      console.error("Failed to submit new chord");
    }
  };

  return (
    <Modal
      className="add_chord__modal"
      overlayClassName="add_chord__overlay"
      onRequestClose={props.addChordHandler}
      contentLabel="Tiny nomadic modal popover"
      isOpen={props.addChordSwitch}
      preventScroll={true}
    >
      <form className="add-chord-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-chord-input">
          <label htmlFor="chordName">Chord Name</label>
          <input
            name="chordName"
            {...register("chordName")}
            placeholder="F#"
            required={true}
          />
        </div>
        {error && <div className="add-chord-error">{error}</div>}
        <Canvas
          strings=""
          enableDraw={true}
          placementGrid={placementGrid}
          setPlacementGrid={setPlacementGrid}
          setError={setError}
          darkMode={props.darkMode}
        />
        <Button className="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default AddChord;
