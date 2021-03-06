import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./modules";
// import loggerMiddleware from "./lib/loggerMiddleware";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
