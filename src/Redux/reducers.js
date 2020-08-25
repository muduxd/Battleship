import { combineReducers } from "redux";

export const listShips = () => {
  return [
    {
      name: "Carrier",
      size: 5,
    },
    {
      name: "Battleship",
      size: 4,
    },
    {
      name: "Destroyer",
      size: 3,
    },
    {
      name: "Submarine",
      size: 3,
    },
    {
      name: "Patrol Boat",
      size: 2,
    },
  ];
};

export const appReducer = combineReducers({ listShips });
