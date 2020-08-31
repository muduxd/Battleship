import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

var index = 0;
var isPlaced = false;

const boardMouseOver = (e) => {
  var row = e.target.getAttribute("row");
  var col = e.target.getAttribute("collumn");
  var col1 = parseInt(col) + 1;
  var el1 = document.getElementById(String(row) + String(col1));
  if (row && col) {
    e.target.style.backgroundColor = "aqua";
    el1.style.backgroundColor = "aqua";
  }
};

const boardMouseOut = (e) => {
  var row = e.target.getAttribute("row");
  var col = e.target.getAttribute("collumn");
  var col1 = parseInt(col) + 1;
  var el1 = document.getElementById(String(row) + String(col1));
  e.target.style.backgroundColor = "white";
  el1.style.backgroundColor = "white";
};

const leftClick = () => {
  var el = document.getElementById(index);
  el.style.border = "1px solid blue";
  el.style.backgroundColor = "aqua";
  console.log(index);
  if (index < 4) {
    index++;
  } else {
    isPlaced = true;
  }
};

const rightClick = () => {
  console.log("right");
};

export const Grid = () => {
  const boardEl = useRef(null);
  useEffect(() => {
    boardEl.current.addEventListener("click", leftClick);
    boardEl.current.addEventListener("contextmenu", rightClick);
    boardEl.current.addEventListener("mouseover", boardMouseOver);
    boardEl.current.addEventListener("mouseout", boardMouseOut);
  });

  const shipSize = useSelector((state) => state.listShips);
  const sizeArr = shipSize.map((ship) => {
    return ship.size;
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

//rendering elements

const RenderSquares = () => {
  const board = useSelector((state) => state.board);
  var arrResult = [];
  for (var i = 0; i < board.gridSize; i++) {
    for (var j = 0; j < board.gridSize; j++) {
      arrResult.push(
        <div
          id={String(i) + String(j)}
          row={i}
          collumn={j}
          key={String(i) + String(j)}
          className="square"
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
