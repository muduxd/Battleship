import React from "react";
import { useSelector } from "react-redux";

export const EnemyShips = () => {
  const ships = useSelector((state) => state.ships);
  const mapArr = ships.map((ship, index) => {
    return (
      <div
        id={index}
        key={index}
        style={{
          backgroundColor: "aqua",
          border: "1px solid blue",
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
        width: "130px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        Enemy Ships
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>{mapArr}</div>
    </div>
  );
};
