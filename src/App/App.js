import React from "react";
import { createStore } from "redux";
import { appReducer } from "../Redux/reducers.js";
import { Provider } from "react-redux";
import { Ships } from "./ships";
import { Grid } from "./grid";

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        Battleship
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <Ships />
        <Grid />
      </div>
    </Provider>
  );
};

export default App;
