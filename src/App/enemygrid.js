import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shotFired, eTurn } from "../Redux/actions";

export const EnemyGrid = () => {
  var index = 0;

  const dispatch = useDispatch();
  const boats = useSelector((state) => state.enemyBoard.boatPos);
  const shots = useSelector((state) => state.enemyBoard.shotPos);
  const yourTurn = useSelector((state) => state.enemyBoard.yourTurn);
  const boatArr = boats.flat();

  //MOUSE EVENTS

  const leftClick = (e) => {
    if (yourTurn) {
      var row = e.target.getAttribute("row");
      var col = e.target.getAttribute("collumn");

      row = parseInt(row);
      col = parseInt(col);

      dispatch(shotFired(col, row));
      dispatch(yTurn());
      dispatch(eTurn());

      console.log(boatArr);

      // for (var i = 0; i <= boatArr.length; i++) {
      //   for (var j = 0; j <= shots.length; j++) {
      //     if (shots[j] == boatArr[i]) {
      //       index++;
      //       console.log(index);
      //     } else {
      //       index = 0;
      //     }
      //   }
      // }
    }
  };

  //BOARD EVENTS

  const boardEl = useRef(null);
  useEffect(() => {
    boardEl.current.addEventListener("click", leftClick);
    return () => {
      boardEl.current.removeEventListener("click", leftClick);
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
    </div>
  );
};

//RENDERING ELEMENTS

const RenderSquares = () => {
  const enemyboard = useSelector((state) => state.enemyBoard);
  const positions = enemyboard.boatPos.flat();
  var arrResult = [];
  for (var i = 0; i < enemyboard.gridSize; i++) {
    for (var j = 0; j < enemyboard.gridSize; j++) {
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
