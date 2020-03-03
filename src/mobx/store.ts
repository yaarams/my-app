import { observable, computed, action } from "mobx";
import * as Types from "../reducers/Types";
import { enableLogging } from "mobx-logger";


// import { streamFetch } from "../FetchStrategies";

enableLogging({
    reaction: true,
    action: true
});

type KeyStore = { [key: string]: number; }

export class SentenceStore {
    @observable
    sentences: Array<Types.Sentence> = [];
    state: string = "start";

    get all(): Array<Types.Sentence> {
        return this.sentences; //add filter 
    }

    //TODO: filtered
    // @action
    // fetch() {
    //     this.sentences = []
    //     this.state = "pending";
    //     streamFetch().then(this.fetchSuccess, this.fetchError)
    // }

    // @action.bound
    // fetchSuccess(sentences) {
    //     const filteredProjects = somePreprocessing(projects)
    //     this.filtered = filteredProjects
    //     this.state = "done"
    // }

    //derived state
    @computed
    get aggregations(): KeyStore {
        return this.sentences.reduce<KeyStore>((acc, curr) => {
            acc[curr.word] = acc[curr.word] ? acc[curr.word] + 1 : 1;
            return acc;
        }, {} as KeyStore);
    }

    @action
    add(word: string, index: number) {
        this.sentences.push({ word, index });
        // console.log(toJS(this.sentences[index]));
    }
}