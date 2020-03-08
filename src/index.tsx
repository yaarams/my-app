import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
// import App from "./App2";
import App from "./App3";

import * as serviceWorker from "./serviceWorker";
// import { createStore } from "redux";
// import { sentenceReducer } from "./reducers/Redux";
// import { Provider } from "react-redux";

// const store = createStore(sentenceReducer);

import { SentenceStore } from "./mobx/store";
import { Provider } from "mobx-react";
// import { Stores } from "./reducers/Types";
const store: SentenceStore = new SentenceStore();
// const stores: Stores = { store};

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
