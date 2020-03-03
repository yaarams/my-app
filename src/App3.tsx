import React from "react";
import "./App.css";

// import { FixedSizeList } from "react-window";
import { observer, inject } from "mobx-react";
import { SentenceStore } from "./mobx/store";

import { useEffect, useCallback } from "react";
import * as Types from "./reducers/Types";
import { streamFetch } from "./FetchStrategies";
import { observable } from "mobx";

interface AppProps extends React.Props<any> {
  store?: SentenceStore;
}

const App = inject("store")(
  observer((props: AppProps) => {
    const { store } = props;
    const sentences = observable(store!.sentences);
    const agg = observable(store!.aggregations);

    const dispatch = useCallback(
      (action: Types.UpdateSentenceAction) => {
        store!.add(action.payload.word, action.payload.index);
      },
      [store]
    );

    useEffect(() => {
      streamFetch(dispatch);
    }, [dispatch]);

    // const item = (p: any) => {
    //   const { data, index, style } = p;
    //   const d = data[index];
    //   console.log(toJS(d));
    //   return <div style={style}>{data[index]}</div>;
    // };

    return (
      <div>
        <div>Aggregations:</div>
        {agg
          ? Object.keys(agg).map(key => (
              <div>
                <span>{key + ":  " + agg[key]}</span>
                <br />
              </div>
            ))
          : ""}
        <div>sentences:</div>
        {sentences
          ? sentences.map(s => {
              return (
                <li>
                  <ul>{s.word + " " + s.index}</ul>
                </li>
              );
            })
          : []}
      </div>
    );
  })
);

export default App;

//challange - make this work with react-window...
// <FixedSizeList
//       itemData={sentences}
//       height={300}
//       width={300}
//       itemCount={90}
//       itemSize={35}
//     >
//       <Observer>{item}</Observer>
//     </FixedSizeList>
