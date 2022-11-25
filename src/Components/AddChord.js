import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import "./AddChord.css";
import axios from "axios";

const AddChord = (props) => {
  const { register, handleSubmit } = useForm();
  Modal.setAppElement("body");

  const onSubmit = async (data) => {
    try {
      let newChord = {
        chordName: data.chordName,
        chordStrings: `${data.Chord1} ${data.Chord2} ${data.Chord3} ${data.Chord4} ${data.Chord5} ${data.Chord6}`,
      };


      axios
        .post("http://localhost:5000/chords/add", newChord)
        .then((res) => console.log(res.data));

      axios.get('http://localhost:5000/chords').then(res => console.log(res.data))

      props.addChordHandler();
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
        <label htmlFor="chordName">Chord Name</label>
        <input name="chordName" {...register("chordName")} />
        <label htmlFor="Chord1">Chord1</label>
        <input name="Chord1" {...register("Chord1")} />
        <label htmlFor="Chord2">Chord2</label>
        <input name="Chord2" {...register("Chord2")} />
        <label htmlFor="Chord3">Chord3</label>
        <input name="Chord3" {...register("Chord3")} />
        <label htmlFor="Chord4">Chord4</label>
        <input name="Chord4" {...register("Chord4")} />
        <label htmlFor="Chord5">Chord5</label>
        <input name="Chord5" {...register("Chord5")} />
        <label htmlFor="Chord6">Chord6</label>
        <input name="Chord6" {...register("Chord6")} />
        <Button>Submit</Button>
      </form>
    </Modal>
  );
};

export default AddChord;
