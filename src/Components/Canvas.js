import React, { useRef, useEffect, useState } from "react";
import "./Canvas.css";

function Canvas({ strings }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const fingerPlacements = strings.replace(/ /g, "");

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {
      context.beginPath();
      context.font = "20px Verdana";
      context.textAlign = "center";
      context.fillStyle = "black";
      const margin = 20;
      const fretLine = margin * 0.8;

      // GUITAR GRID
      //Horizontal Lines
      for (let i = 0; i < 6; i++) {
        context.moveTo(
          margin,
          i * ((canvasRef.current.height - 2 * margin) / 5) + margin
        );
        context.lineTo(
          canvasRef.current.width - margin,
          i * ((canvasRef.current.height - 2 * margin) / 5) + margin
        );

        //Vertical Lines
        context.moveTo(
          i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
          margin
        );
        context.lineTo(
          i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
          canvasRef.current.height - margin
        );
      }

      context.stroke();

      for (let i = 0; i < fingerPlacements.length; i++) {
        context.beginPath();
        if (fingerPlacements[i] === "X") {
          context.fillText(
            "X",
            i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
            fretLine
          );
        } else if (fingerPlacements[i] === "0") {
          context.fillText(
            "O",
            i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
            fretLine
          );
        } else {
          context.arc(
            i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
            fingerPlacements[i] *
              ((canvasRef.current.height - 2 * margin) / 5) +
              margin -
              (canvasRef.current.height - 2 * margin) / 5 / 2,
            10,
            0,
            2 * Math.PI
          );
        }
        context.fill();
        context.stroke();
      }
    }
  }, [context, fingerPlacements]);

  return (
    <canvas
      className="chord-canvas"
      width="200"
      height="300"
      ref={canvasRef}
    ></canvas>
  );
}

export default Canvas;
