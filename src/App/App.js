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
      <div>
        <h1>Battleship</h1>
      </div>
      <Ships />
      <Grid />
    </Provider>
  );
};

export default App;
