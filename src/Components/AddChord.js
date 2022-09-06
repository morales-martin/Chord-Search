import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./AddChord.css";

const AddChord = (props) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      props.setAddChord(false);
    }
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>This is a Modal</h2>
        <button onClick={() => props.setAddChord(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AddChord;
