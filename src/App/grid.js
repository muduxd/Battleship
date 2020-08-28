import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";

const boardMouseOver = (e) => {
  var attribute = e.target;
  var row = attribute.getAttribute("row");
  var col = attribute.getAttribute("collumn");
  console.log(row);
  console.log(col);
};

export const Grid = () => {
  const boardEl = useRef(null);
  useEffect(() => {
    boardEl.current.addEventListener("mouseover", boardMouseOver);
    return () =>
      boardEl.current.removeEventListener("mouseover", boardMouseOver);
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
