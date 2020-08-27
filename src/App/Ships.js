import React from "react";
import { useSelector } from "react-redux";

export const Ships = () => {
  const ships = useSelector((state) => state.listShips);
  const mapArr = ships.map((ship, index) => {
    return (
      <div
        id="box"
        key={index}
        style={{
          backgroundColor: "lightgrey",
          border: "1px solid black",
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
        flexWrap: "wrap",
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
