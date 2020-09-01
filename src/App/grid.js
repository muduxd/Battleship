import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextShip, placeShip } from "../Redux/actions";

var index = 0;
var isPlaced = false;

//MOUSE EVENTS

const boardMouseOut = (e) => {
  // var row = e.target.getAttribute("row");
  // var col = e.target.getAttribute("collumn");
  // var col1 = parseInt(col);
  // if (col1 + sizeArr[index] > 10) {
  //   col1 = 10 - sizeArr[index];
  // }
  // for (var i = 1; i <= sizeArr[index]; i++) {
  //   el[i].style.backgroundColor = "white";
  // }
};

const rightClick = () => {
  console.log("right");
};

export const Grid = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.ships);
  const shipPos = useSelector((state) => state.board.currentShip);
  const currentSize = ships[shipPos].size;

  const leftClick = () => {
    if (shipPos < 4) {
      dispatch(nextShip());
    }
  };

  const boardMouseOver = (e) => {
    var row = e.target.getAttribute("row");
    var col = e.target.getAttribute("collumn");

    row = parseInt(row);
    col = parseInt(col);

    const arr = [];
    for (var i = 0; i < currentSize; i++) {
      arr.push([col + i, row]);
    }
    dispatch(
      placeShip({
        cords: arr,
        shipPos,
      })
    );
  };

  const boardEl = useRef(null);
  useEffect(() => {
    boardEl.current.addEventListener("click", leftClick);
    boardEl.current.addEventListener("contextmenu", rightClick);
    boardEl.current.addEventListener("mouseover", boardMouseOver);
    boardEl.current.addEventListener("mouseout", boardMouseOut);
    return () => {
      boardEl.current.removeEventListener("click", leftClick);
      boardEl.current.removeEventListener("contextmenu", rightClick);
      boardEl.current.removeEventListener("mouseover", boardMouseOver);
      boardEl.current.removeEventListener("mouseout", boardMouseOut);
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "420px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "25px",
          height: "350px",
          marginTop: "26px",
        }}
      >
        {<RenderLetters />}
      </div>
      <div
        style={{
          width: "350px",
          height: "375px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "385px",
            height: "25px",
          }}
        >
          {<RenderNumbers />}
        </div>

        <div
          ref={boardEl}
          id="grid"
          style={{
            border: "1px solid black",
            width: "350px",
            height: "350px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {<RenderSquares />}
        </div>
      </div>
    </div>
  );
};

//RENDERING ELEMENTS

const RenderSquares = () => {
  const board = useSelector((state) => state.board);
  const positions = board.boatPos.flat();

  var arrResult = [];
  for (var i = 0; i < board.gridSize; i++) {
    for (var j = 0; j < board.gridSize; j++) {
      const found = positions.find(
        (element) => element[0] == j && element[1] == i
      );

      arrResult.push(
        <div
          id={String(i) + String(j)}
          row={i}
          collumn={j}
          key={String(i) + String(j)}
          className="square"
          style={{
            backgroundColor: found ? "aqua" : "white",
          }}
        ></div>
      );
    }
  }
  return arrResult;
};

const RenderNumbers = () => {
  var arr = [];
  for (var i = 1; i <= 10; i++) {
    if (i === 1) {
      arr.push(
        <div
          key="EMPTY"
          className="side"
          style={{ width: "35px", height: "25px" }}
        ></div>
      );
    }
    arr.push(
      <div key={i} className="side" style={{ width: "35px", height: "25px" }}>
        {i}
      </div>
    );
  }
  return arr;
};

const RenderLetters = () => {
  var arr = [];
  for (var i = "A"; i !== "K"; ) {
    arr.push(
      <div key={i} className="side" style={{ width: "25px", height: "35px" }}>
        {i}
      </div>
    );
    i = i.substring(0, 0) + String.fromCharCode(i.charCodeAt(0) + 1);
  }
  return arr;
};

const RenderButtons = () => {
  var startButton = <button>Start</button>;
  return startButton;
};
