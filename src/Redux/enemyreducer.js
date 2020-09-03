import { combineReducers } from "redux";
import { NEXT_SHIP, PLACE_SHIP, RESET_STATE } from "./actions";

export const initialState = {
  board: {
    gridSize: 10,
    boatPos: [],
    currentShip: 0,
  },
  ships: [
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
  ],
};

export const ships = (state = initialState.ships) => {
  return state;
};

export const board = (state = initialState.board, action) => {
  //   if (action.type === NEXT_SHIP) {
  //     return {
  //       ...state,
  //       currentShip: ++state.currentShip,
  //     };
  //   }
  //   if (action.type === PLACE_SHIP) {
  //     const boatPos = [...state.boatPos];
  //     boatPos[action.payload.shipPos] = action.payload.cords;
  //     return {
  //       ...state,
  //       boatPos,
  //     };
  //   }
  //   if (action.type === RESET_STATE) {
  //     return (state = initialState.board);
  //   }
  //   return state;
};

export const appReducer = combineReducers({ ships, board });
