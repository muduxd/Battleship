import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";

const boardMouseOver = (e) => {
  var attribute = e.target;
  var row = attribute.getAttribute("row");
  var col = attribute.getAttribute("collumn");
  if (row && col) {
    e.target.style.backgroundColor = "aqua";
  }
};

const boardMouseOut = (e) => {
  var attribute = e.target;
  var row = attribute.getAttribute("row");
  var col = attribute.getAttribute("collumn");
  if (row && col) {
    e.target.style.backgroundColor = "white";
  }
};

const leftClick = () => {
  console.log("left");
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
    return () => {
      boardEl.current.removeEventListener("mouseover", boardMouseOver);
    };
  });
  return (
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
  );
};

const RenderSquares = () => {
  const board = useSelector((state) => state.board);
  var arrResult = [];
  for (var i = 0; i < board.gridSize; i++) {
    for (var j = 0; j < board.gridSize; j++) {
      arrResult.push(
        <div
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
