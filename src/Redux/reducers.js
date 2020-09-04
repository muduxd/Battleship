import { combineReducers } from "redux";
import {
  NEXT_SHIP,
  PLACE_SHIP,
  RESET_STATE,
  START_GAME,
  ENEMY_FLOAT,
  SHOT_FIRED,
} from "./actions";

export const initialState = {
  board: {
    gridSize: 10,
    boatPos: [],
    shotPos: [],
    currentShip: 0,
  },
  enemyboard: {
    gridSize: 10,
    boatPos: [],
    shotPos: [],
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
  game: {
    started: false,
  },
};

export const ships = (state = initialState.ships) => {
  return state;
};

export const board = (state = initialState.board, action) => {
  if (action.type === NEXT_SHIP) {
    return {
      ...state,
      currentShip: ++state.currentShip,
    };
  }
  if (action.type === PLACE_SHIP) {
    const boatPos = [...state.boatPos];
    boatPos[action.payload.shipPos] = action.payload.cords;
    return {
      ...state,
      boatPos,
    };
  }
  if (action.type === RESET_STATE) {
    return (state = initialState.board);
  }
  return state;
};

export const enemyBoard = (state = initialState.enemyboard, action) => {
  if (action.type === ENEMY_FLOAT) {
    return {
      ...state,
      boatPos: renderFloat(action.ships, action.gridSize),
    };
  }
  if (action.type === SHOT_FIRED) {
    return {
      ...state,
      shotPos: shot(action.col, action.row, state.boatPos),
    };
  }
  return state;
};

export const game = (state = initialState.game, action) => {
  if (action.type === START_GAME) {
    return {
      ...state,
      started: true,
    };
  }
  return state;
};

const shot = (col, row, enemypos) => {
  const positions = enemypos.flat();
  const found = positions.find(
    (element) => element[0] == col && element[1] == row
  );
  if (found) {
    console.log("hit");
  } else {
    console.log("miss");
  }
};

const renderFloat = (ships, gridSize) => {
  const result = [];

  for (var index = 0; index <= 4; index++) {
    result[index] = [];

    var randomCol = Math.floor(Math.random() * 10);
    var randomRow = Math.floor(Math.random() * 10);

    var vertical = Math.random() >= 0.5;
    var currentSize = ships[index].size;

    if (randomCol + currentSize > gridSize && vertical === false) {
      randomCol = gridSize - currentSize;
    } else {
      if (randomRow + currentSize > gridSize && vertical === true) {
        randomRow = gridSize - currentSize;
      }
    }

    for (var i = 0; i < currentSize; i++) {
      let cords;
      if (vertical) {
        cords = [randomCol, randomRow + i];
      } else {
        cords = [randomCol + i, randomRow];
      }
      result[index][i] = cords;
    }
  }
  return result;
};

export const appReducer = combineReducers({ ships, board, game, enemyBoard });
