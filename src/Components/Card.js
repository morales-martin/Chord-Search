import React from 'react'
import './Card.css'
import Canvas from './Canvas';

function Card(props) {

    const classes='card ' + props.className;
    const chordName=props.chordName;


  return (
    <div className={classes}>
        <h1>{chordName.replace(/,/g,'')}</h1>
        <Canvas strings={props.strings} enableDraw={false}></Canvas>
    </div>
  )
}

export default Card;
