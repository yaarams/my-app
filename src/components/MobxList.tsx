import React from "react";
import { FixedSizeList } from "react-window";
import * as Types from "../reducers/Types";

import { SentenceStore } from "../mobx/store";
import { observer, inject, IWrappedComponent } from "mobx-react";
import { observable } from "mobx";
import { aggregationReducer } from "../reducers/Redux";
import { createSelectorHook } from "react-redux";

interface ListProps extends React.Props<any> {
  store?: SentenceStore;
}

interface ListProps2{// extends React.Props<any> {
  sentences: Array<Types.Sentence>;
  // id: number;
}

const createSelector = (captureName: string = "") => {
  const sel = ({ aggregations }: SentenceStore) => ({
    sentences: aggregations[captureName]
  });
  return sel;
};

const createList = (store: SentenceStore, capture: string) => {
  const sel = createSelector(capture);
  return inject(sel)(observer(List));
};
// type EmptyObj = {[keys: string]: string}; 

// function inject2<P, S>(selector: (stores: any) => S, comp: React.FC<P>) : React.FC<{[keys: Exclude<keyof P,keyof S>] : any }>  {//& IWrappedComponent<unknown> {
//   const c = inject(selector)(observer(comp));
//   return c as unknown as React.FC<{[keys: Exclude<keyof P,keyof S>] : any }> ;//& IWrappedComponent<unknown>;
// }

function inject2<P, S>(selector: (stores : any) => S, comp: React.FC<P>): React.FC<Omit<P,keyof S>> & IWrappedComponent<P> {
  const c = inject(selector)(observer(comp));
  return c as unknown as React.FC<Omit<P,keyof S>> & IWrappedComponent<P>;
}

const selector = ({store} : {store: SentenceStore}) => {
  return ({sentences: store.sentences as Array<Types.Sentence>});
}

//option #1 - functional comp
// export const List = inject(selector)(
//   observer((props: ListProps2) => {
//     const { sentences } = props;
//     return (
//       <FixedSizeList
//         itemData={sentences}
//         height={300}
//         width={300}
//         itemCount={90}
//         itemSize={35}
//       >
//         {({ data, index, style }: {data: any, index: number, style: any}) => data[index] ? (
//            <div style={style}>{data[index].word + " " + data[index].index}</div>
//         ) : <div>-s</div>}
//       </FixedSizeList>
//     )
//   })
// );

export const List = inject2<ListProps2, {sentences : Array<Types.Sentence>}>(
  selector,
  (props: ListProps2) => {
    const { sentences } = props;
    return (
      <FixedSizeList
        itemData={sentences}
        height={300}
        width={300}
        itemCount={90}
        itemSize={35}
      >
        {({ data, index, style }: {data: any, index: number, style: any}) => data[index] ? (
           <div style={style}>{data[index].word + " " + data[index].index}</div>
        ) : <div>-s</div>}
      </FixedSizeList>
    );
  });

//option #2 - class comp
@observer
@inject("store")
export class ListClass extends React.Component<ListProps> {
  @observable
  private sentences: Array<Types.Sentence> = (this.props.store && this.props.store.all) || [];

  render() {
    return (
      <FixedSizeList
        itemData={this.sentences}
        height={300}
        width={300}
        itemCount={90}
        itemSize={35}
      >
       {({ data, index, style }: {data: any, index: number, style: any}) => data[index] ? (
           <div style={style}>{data[index].word + " " + data[index].index}</div>
        ) : <div>x</div>}
      </FixedSizeList>
    );
  }
}

export default createList;
