import React from "react";
import { useSelector } from "react-redux";

export const Ships = () => {
  const ships = useSelector((state) => state.ships);
  const currentShip = useSelector((state) => state.board.currentShip);
  const mapArr = ships.map((ship, index) => {
    return (
      <div
        id={index}
        key={index}
        style={{
          backgroundColor:
            currentShip == index
              ? "lightgreen"
              : currentShip < index
              ? "lightgrey"
              : "aqua",
          border:
            currentShip == index
              ? "1px solid green"
              : currentShip < index
              ? "1px solid grey"
              : "1px solid blue",
          width: ship.size * 15 + "px",
          height: "10px",
          marginBottom: "5px",
        }}
      ></div>
    );
  });

  return (
    <div
      style={{
        width: "110px",
        display: "flex",
        flexDirection: "column",
        marginRight: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        Your Ships
      </h1>
      <div
        style={{
          alignItems: "flex-end",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mapArr}
      </div>
    </div>
  );
};
