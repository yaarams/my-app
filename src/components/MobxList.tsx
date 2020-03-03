import React from "react";
import { FixedSizeList } from "react-window";
import * as Types from "../reducers/Types";

import { SentenceStore } from "../mobx/store";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

interface ListProps extends React.Props<any> {
  store: SentenceStore;
}

//option #1 - functional comp
const List = inject("store")(
  observer((props: ListProps) => {
    const { store } = props;
    return (
      <FixedSizeList
        itemData={store.all}
        height={300}
        width={300}
        itemCount={90}
        itemSize={35}
      >
        {({ data, index, style }) => (
          <div style={style}>{data[index].word + " " + data[index].index}</div>
        )}
      </FixedSizeList>
    );
  })
);

//option #2 - class comp
@observer
@inject("store")
export class ListClass extends React.Component<ListProps> {
  @observable
  private sentences: Array<Types.Sentence> = this.props.store.all;

  render() {
    return (
      <FixedSizeList
        itemData={this.sentences}
        height={300}
        width={300}
        itemCount={90}
        itemSize={35}
      >
        {({ data, index, style }) => (
          <div style={style}>{data[index].word + " " + data[index].index}</div>
        )}
      </FixedSizeList>
    );
  }
}

export default List;
