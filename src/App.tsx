import React, { useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { streamFetch } from "./FetchStrategies";
import { FixedSizeList } from "react-window";
import { sentencesReducer, aggregationsReducer } from "./reducers/Hooks";

 
function App() {
  const initSentencesState = {allSentences: [], filtered: []};
  const initAggState = {selected: new Set<string>(), counts: {}};

  const [data, dispatch] = useReducer(sentencesReducer, initSentencesState);
  const [agg, dispatch2] = useReducer(aggregationsReducer, initAggState);
  useEffect(() => {
    streamFetch(dispatch);
  }, []);
  const sentences = (data.filtered && data.filtered.length > 0) ? data.filtered : data.allSentences;
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
        <button onClick={() => dispatch2({type: "select", payload: "aaa"})}>aaa</button>
        <button onClick={() => dispatch2({type: "select", payload: "bbb"})}>bbb</button>
        <button onClick={() => dispatch({type: "filter", payload: agg.selected})}>filter</button>
        <FixedSizeList
          itemData={sentences}
          height={300}
          width={300}
          itemCount={90}
          itemSize={35}>
          {({ data, index, style }) => (
            <div style={style}>{data[index] && (data[index].index + " " + data[index].word)}</div>
          )}
        </FixedSizeList>
          <div>-----------</div>
        <FixedSizeList
          itemData={agg.selected}
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
