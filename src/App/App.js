import React from "react";
import { createStore } from "redux";
import { appReducer } from "../Redux/reducers.js";
import { Provider } from "react-redux";
import { Ships } from "./Ships";

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1 className="title">Battleship</h1>
        <div className="grid"></div>
      </div>
      <Ships />
    </Provider>
  );
};

export default App;
