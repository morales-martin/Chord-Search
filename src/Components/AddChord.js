import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import "./AddChord.css";
import axios from "axios";
import Canvas from "./Canvas";

const AddChord = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [placementGrid, setPlacementGrid] = useState([]);

  Modal.setAppElement("body");

  const onSubmit = async (data) => {
    try {
      let chordStrings = [];

      for (let vertex of placementGrid) {
        if (vertex.isVisible) {
          chordStrings[vertex.stringPosition[0]] = vertex.stringPosition[1];
        }
      }

      let newChord = {
        chordName: data.chordName,
        chordStrings: chordStrings.join(" "),
      };

      axios
        .post("http://localhost:5000/chords/add", newChord)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => setError(err.response.data));

      // if (!error) props.addChordHandler();
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
    >
      <form className="add-chord-form" onSubmit={handleSubmit(onSubmit)}>
        {error && <div className="add-chord-error">{error}</div>}
        <div className="add-chord-input">
          <label htmlFor="chordName">Chord Name</label>
          <input
            name="chordName"
            {...register("chordName")}
            placeholder="F#"
            required={true}
          />
        </div>
        <Canvas
          strings=""
          enableDraw={true}
          placementGrid={placementGrid}
          setPlacementGrid={setPlacementGrid}
          setError={setError}
        />
        <Button>Submit</Button>
      </form>
    </Modal>
  );
};

export default AddChord;
