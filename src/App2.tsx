import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import List from "./containers/List";
import { streamFetch } from "./FetchStrategies";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    streamFetch(dispatch);
  }, [dispatch]);
  return (
    <div>
      <List />
    </div>
  );
}

export default App;
