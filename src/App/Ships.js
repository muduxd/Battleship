import React from "react";
import { useSelector } from "react-redux";

export const Ships = () => {
  const ships = useSelector((state) => state.listShips);
  const mapArr = ships.map((ship, index) => {
    return (
      <div
        key={index}
        style={{
          color: "red",
          backgroundColor: "lightgray",
          border: "1px solid grey",
          width: ship.size * 10 + "px",
          height: "10px",
          marginBottom: "5px",
        }}
      ></div>
    );
  });
  return (
    <div
      style={{
        width: "170px",
      }}
    >
      <h1>Your Ships</h1>
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
