import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextShip,
  placeShip,
  resetState,
  startGame,
  enemyFloat,
  eTurn,
  yTurn,
} from "../Redux/actions";
import { EnemyGrid } from "./enemygrid";
import { EnemyShips } from "./enemyships";

var index = 0;
var status = "Place your ships";
var vertical = false;

export const Grid = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.ships);
  const shipPos = useSelector((state) => state.board.currentShip);
  const enemyTurn = useSelector((state) => state.board.enemyTurn);
  var started = useSelector((state) => state.game.started);

  if (index >= 5) {
    currentSize = 0;
    status = "All ships are in place!";
  } else {
    var currentSize = ships[shipPos].size;
    status = "Place your ships";
  }

  //MOUSE EVENTS

  const leftClick = () => {
    index++;
    dispatch(nextShip());
    if (enemyTurn) {
      var randomCol = Math.floor(Math.random() * 10);
      var randomRow = Math.floor(Math.random() * 10);
      dispatch(eTurn());
      dispatch(yTurn());
    }
  };

  const rightClick = (e) => {
    e.preventDefault();
    vertical = !vertical;
  };

  const boardMouseOver = (e) => {
    var row = e.target.getAttribute("row");
    var col = e.target.getAttribute("collumn");

    row = parseInt(row);
    col = parseInt(col);

    const arr = [];
    for (var i = 0; i < currentSize; i++) {
      if (col + currentSize > 10 && vertical === false) {
        col = 10 - currentSize;
      } else {
        if (row + currentSize > 10 && vertical === true) {
          row = 10 - currentSize;
        }
      }
      if (vertical) {
        arr.push([col, row + i]);
      } else {
        arr.push([col + i, row]);
      }
    }
    dispatch(
      placeShip({
        cords: arr,
        shipPos,
      })
    );
  };

  //BUTTONS

  const StartButton = () => {
    dispatch(startGame());
    dispatch(enemyFloat(ships, 10));
  };

  const ResetButton = () => {
    dispatch(resetState());
    index = 0;
  };

  const RenderButtons = () => {
    const arr = [];
    var startButton = (
      <button
        key="start"
        onClick={StartButton}
        style={{
          color: "white",
          backgroundColor: "aqua",
          border: "1px solid black",
          width: "50px",
          height: "20px",
          marginRight: "40px",
        }}
      >
        Start
      </button>
    );
    var resetButton = (
      <button
        key="reset"
        onClick={ResetButton}
        style={{
          color: "aqua",
          backgroundColor: "white",
          border: "1px solid black",
          width: "50px",
          height: "20px",
        }}
      >
        Reset
      </button>
    );
    arr.push(startButton, resetButton);
    return arr;
  };

  //BOARD EVENTS

  const boardEl = useRef(null);
  useEffect(() => {
    boardEl.current.addEventListener("click", leftClick);
    boardEl.current.addEventListener("contextmenu", rightClick);
    boardEl.current.addEventListener("mouseover", boardMouseOver);
    return () => {
      boardEl.current.removeEventListener("click", leftClick);
      boardEl.current.removeEventListener("contextmenu", rightClick);
      boardEl.current.removeEventListener("mouseover", boardMouseOver);
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "420px",
        }}
      >
        <div>{status}</div>
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
      {started ? (
        <div>
          <div>
            <EnemyGrid />
          </div>
          <div>
            <EnemyShips />
          </div>
        </div>
      ) : null}

      {index >= 5 && started == false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50px",
            height: "20px",
          }}
        >
          {<RenderButtons />}
        </div>
      ) : null}
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
