import { combineReducers } from "redux";

export const initialState = {
  board: {
    gridSize: 10,
    boatPos: [],
    currentShip: 0,
  },
};

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

export const board = (state = initialState.board, action) => {
  return state;
};

export const appReducer = combineReducers({ listShips, board });
