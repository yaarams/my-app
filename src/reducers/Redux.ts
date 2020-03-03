import * as Types from "./Types";

function insertItem(array: Readonly<Array<Types.Sentence>>, action: Types.UpdateSentenceAction) {
    return [
        ...array.slice(0, action.payload.index),
        action.payload,
        ...array.slice(action.payload.index)
    ]
}

export const sentenceReducer: Types.SentenceReducer = ( state: Readonly<Types.SentencesState> = Types.initialSentenceState, 
                                                        action: Types.SentenceAction): Readonly<Types.SentencesState> => {
    switch (action.type) {
        case "update":
            return Object.assign({}, state, { allSentences: insertItem(state.allSentences, action) });
        case "filter":
            const selectedSet: Set<string> = action.payload;
            const filtered = state.allSentences.filter((s) => selectedSet.has(s.word));
            return Object.assign({}, state, { filtered });
        case "reset":
            return Object.assign({}, state, { filtered: [] });
        default:
            return state;
    }
}

export const aggregationReducer: Types.AggregationReducer = (   state: Readonly<Types.AggregationsState> = Types.initialAggState, 
                                                                action: Types.AggregationAction): Readonly<Types.AggregationsState> => {
    switch (action) {
        default:
            return state;
    }
}