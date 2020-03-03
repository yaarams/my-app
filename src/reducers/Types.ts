import { Action } from "redux";
import { Reducer } from "redux";
// import { Reducer } from "react";

export type Counters = { [key: string]: number };
export type Sentence = {
    word: string,
    index: number
};

export type SentencesState = {
    allSentences: Array<Sentence>,
    filtered: Array<Sentence>
};
export type AggregationsState = {
    counts: Counters,
    selected: Set<string>
};
export type Store = {
    sentences: SentencesState,
    agg: AggregationsState
}
export interface IncrementAction extends Action<string> { type: 'increment'; payload: string; }
export interface SelectAction extends Action<string> { type: 'select'; payload: string; }
export interface ResetAction extends Action<string> { type: 'reset'; payload: null}

export type AggregationAction =
    | IncrementAction
    | SelectAction
    | ResetAction;

export interface UpdateSentenceAction extends Action<string> { type: 'update'; payload: Sentence; };
export interface FilterSentenceAction extends Action<string> { type: 'filter'; payload: Set<string>; };

export type SentenceAction =
    | UpdateSentenceAction
    | FilterSentenceAction
    | ResetAction;

export type AggregationReducer = Reducer<Readonly<AggregationsState>, AggregationAction>;
export type SentenceReducer = Reducer<Readonly<SentencesState>, SentenceAction>;

export const initialSentenceState = { allSentences: new Array<Sentence>(), filtered: new Array<Sentence>() };
export const initialAggState = { counts: {}, selected: new Set<string>() };

//sideEffects: filter..