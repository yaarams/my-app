import React from "react";
import { FixedSizeList } from "react-window";
import * as Types from "../reducers/Types";
import { connect } from "react-redux";
// import { Dispatch } from "redux";

type ListProps = {
    sentences: Array<Types.Sentence>;
}

function List(props: ListProps) {
  const { sentences } = props;
  return (
    <FixedSizeList
      itemData={sentences}
      height={300}
      width={300}
      itemCount={90}
      itemSize={35}
    >
      {({ data, index, style }) => <div style={style}>{data[index]}</div>}
    </FixedSizeList>
  );
}

const mapStateToProps = (state : Types.SentencesState) => ({
    sentences: state.allSentences
})

// const mapDispatchToProps = (dispatch: Dispatch<Types.SentencesAction>) => ({
//     update: dispatch({type: "update"})
// });

export default connect(mapStateToProps)(List);