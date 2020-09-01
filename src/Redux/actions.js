export const NEXT_SHIP = "NEXT_SHIP";
export const PLACE_SHIP = "PLACE_SHIP";

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
