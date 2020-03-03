import { SentencesState, SentenceAction, UpdateSentenceAction, AggregationsState, AggregationReducer, SentenceReducer, AggregationAction, Sentence, initialSentenceState, initialAggState } from "./Types";

// use immer, immutablejs?

function insertItem(array: Readonly<Sentence[]>, action: UpdateSentenceAction) {
    return [
        ...array.slice(0, action.payload.index),
        action.payload,
        ...array.slice(action.payload.index)
    ]
}

export const sentencesReducer: SentenceReducer = (
    state: Readonly<SentencesState> = initialSentenceState, 
    action: SentenceAction
): Readonly<SentencesState> => {
    
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
            throw new Error("Unexpected action");
    }
};


export const aggregationsReducer: AggregationReducer = (state: Readonly<AggregationsState> = initialAggState, action: AggregationAction): Readonly<AggregationsState> => {
    let counts;
    switch (action.type) {
        case "increment":
            if (!state.counts[action.payload]) {
                counts = Object.assign({}, state.counts, { [action.payload]: 1 });
            } else {
                counts = Object.assign({}, state.counts, { [action.payload]: state.counts[action.payload]++ });
            }
            return Object.assign({}, state, { counts });
        case "reset":
            counts = {};
            return Object.assign({}, state, { counts });
        case "select":
            const selected = new Set(state.selected);
            selected.add(action.payload);
            return Object.assign({}, state, { selected });
        //side effect: dispatch({type: "filter", payload: state.selected})
        default:
            throw new Error("Unexpected action");
    }
};