import React, { useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { State, Action, streamFetch } from "./FetchStrategies";
import { FixedSizeList } from "react-window";

const reducer = (state: State[], action: Action) : State[] => {
  switch (action.type) {
    case "increment":
      return state.concat(action.payload);
    case "decrement":
      return state.concat(-action.payload);
    case "reset":
      return [0];
    default:
      throw new Error("Unexpected action");
  }
};
 
function App() {
  const [count, dispatch] = useReducer(reducer, [0]);
  useEffect(() => {
    streamFetch(dispatch);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <div>{count}</div> */}
        <button onClick={() => dispatch({type: "increment", payload: 1})}>+1</button>
        <button onClick={() => dispatch({type: "decrement", payload: 1})}>-1</button>
        <button onClick={() => dispatch({type: "increment", payload: 3})}>+3</button>
        <button onClick={() => dispatch({type: "reset"})}>0</button>
        <FixedSizeList
          itemData={count}
          height={300}
          width={300}
          itemCount={90}
          itemSize={35}>
            {({ data, index, style }) => (
              <div style={style}>{data[index]}</div>
            )}
          </FixedSizeList>
      </header>
    </div>
  );
}

export default App;
