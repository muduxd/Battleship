export const NEXT_SHIP = "NEXT_SHIP";
export const PLACE_SHIP = "PLACE_SHIP";
export const RESET_STATE = "RESET_STATE";
export const START_GAME = "START_GAME";
export const ENEMY_FLOAT = "ENEMY_FLOAT";
export const SHOT_FIRED = "SHOT_FIRED";

export const nextShip = () => {
  return {
    type: NEXT_SHIP,
  };
};

export const placeShip = (payload) => {
  return {
    type: PLACE_SHIP,
    payload,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

export const startGame = () => {
  return {
    type: START_GAME,
  };
};

export const enemyFloat = (ships, gridSize) => {
  return {
    type: ENEMY_FLOAT,
    ships,
    gridSize,
  };
};

export const shotFired = (col, row) => {
  return {
    type: SHOT_FIRED,
    col,
    row,
  };
};
