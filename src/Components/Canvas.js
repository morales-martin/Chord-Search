import React, { useRef, useEffect, useState } from "react";
import "./Canvas.css";

function Canvas(props) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const fingerPlacements = props.strings.replace(/ /g, "");
  const margin = 20;
  const fretLine = margin * 0.8;

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {
      context.font = "20px Verdana";
      context.textAlign = "center";
      context.fillStyle = "black";

      drawGrid();
      if (props.enableDraw) {
        populateFingerPlacementCoordinates();
      } else {
        drawStringPlacements();
      }
    }
  }, [context]);

  const populateFingerPlacementCoordinates = () => {
    let currGrid = [];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        currGrid.push({
          coords: [
            i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
            j * ((canvasRef.current.height - 2 * margin) / 5) +
              margin -
              (canvasRef.current.height - 2 * margin) / 5 / 2,
          ],
          stringPosition: [i, j],
          isVisible: false,
        });
      }
    }
    props.setPlacementGrid([...currGrid]);
  };

  const drawGrid = () => {
    // GUITAR GRID
    //Horizontal Lines
    for (let i = 0; i < 6; i++) {
      context.beginPath();
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
      context.stroke();
    }
  };

  const drawStringPlacements = () => {
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
      } else if (fingerPlacements[i] < 6) {
        context.arc(
          i * ((canvasRef.current.width - 2 * margin) / 5) + margin,
          fingerPlacements[i] * ((canvasRef.current.height - 2 * margin) / 5) +
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
  };

  const onMouseClick = (e) => {
    const mouseX = e.pageX - e.target.offsetLeft;
    const mouseY = e.pageY - e.target.offsetTop;

    let minDistance = Infinity;
    let minVertex;
    for (let vertex of props.placementGrid) {
      let currDistance = Math.max(
        Math.abs(mouseX - vertex.coords[0]),
        Math.abs(mouseY - vertex.coords[1])
      );

      if (currDistance < minDistance) {
        minDistance = currDistance;
        minVertex = [vertex.coords[0], vertex.coords[1]];
      }
    }

    let currPlacementGrid = [...props.placementGrid];

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawGrid();
    for (let vertex of currPlacementGrid) {
      if (
        vertex.coords[0] === minVertex[0] &&
        vertex.coords[1] === minVertex[1]
      ) {
        vertex.isVisible = true;
      } else if (vertex.coords[0] === minVertex[0]) {
        vertex.isVisible = false;
      }

      if (vertex.isVisible === true) {
        context.beginPath();
        if(vertex.stringPosition[1] === 0) {
          context.fillText(
            "X",
            vertex.coords[0],
            fretLine
          );
        }else{
          context.arc(vertex.coords[0], vertex.coords[1], 10, 0, 2 * Math.PI);
        }
        context.fill();
        context.stroke();
      }
    }

    props.setPlacementGrid([...currPlacementGrid]);
    props.setError("")
  };

  return (
    <React.Fragment>
      {props.enableDraw ? (
        <canvas
          className="chord-canvas"
          width="300"
          height="300"
          ref={canvasRef}
          onMouseDown={onMouseClick}
        ></canvas>
      ) : (
        <canvas
          className="chord-canvas"
          width="300"
          height="300"
          ref={canvasRef}
        ></canvas>
      )}
    </React.Fragment>
  );
}

export default Canvas;
