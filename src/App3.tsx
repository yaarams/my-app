import React from "react";
import "./App.css";

// import { FixedSizeList } from "react-window";
import { observer, inject } from "mobx-react";
import { SentenceStore } from "./mobx/store";

import { useEffect, useCallback } from "react";
import * as Types from "./reducers/Types";
import { streamFetch } from "./FetchStrategies";
// import { observable } from "mobx";
// import { FixedSizeList } from "react-window";
import {List} from "./components/MobxList";

interface AppProps extends React.Props<any> {
  store?: SentenceStore;
}

// class Row extends React.PureComponent<{ item: any }> {
//   render() {
//     const { item } = this.props;
//     return (
//       <div>
//         {item.word} {item.index ? "█".repeat(item.index) : null}
//       </div>
//     );
//   }
// }

const App =
  // inject("store")(
  // observer(
  (props: AppProps) => {
    const { store } = props;
    // const sentences = store!.sentences; //observable(store!.sentences);
    const agg = store!.aggregations; //observable(store!.aggregations);

    const dispatch = useCallback(
      (action: Types.UpdateSentenceAction) => {
        store!.add(action.payload.word, action.payload.index);
      },
      [store]
    );

    useEffect(() => {
      streamFetch(dispatch);
    }, [dispatch]);

    // const itemRenderer = ({ data, index, style } : {data: any, index: number, style: any}) => {
    //   if (data[index])
    //     return <div style={style}>
    //       <div>{data[index].word}</div>
    //     </div>;
    //   return <div>None</div>
    // }

    // const item = (p: any) => {
    //   const { data, index, style } = p;
    //   // const d = data[index];
    //   // console.log(toJS(d));
    //   const { word } = data[index] ? data[index] : { word: "" };
    //   return <div style={style}>{word}</div>;
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
        //challange - make this work with react-window...
        <List />
      </div>
    );
  };
// );
// );

export default inject("store")(observer(App));

// {sentences
//   ? sentences.map(s => {
//       return (
//         <li>
//           <ul>{s.word + " " + s.index}</ul>
//         </li>
//       );
//     })
//   : []}
