import React from "react";
import axios from 'axios';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { UpdateSentenceAction } from "./reducers/Types";

export function axiosFetch() {
    return axios({
        method: 'get',
        url: 'http://localhost:5000/api/3/search/dummy',
        responseType: 'stream',
    })
        .then(function (response) {
            debugger;
            console.log(response);
        });
}

export function rxjsFetch() {
    const data = fromFetch('http://localhost:5000/api/3/search/dummy').pipe(
        switchMap(response => {
            debugger;
            if (response.ok) {
                // OK return data
                return response.json();
            } else {
                // Server is returning a status requiring the client to try something else.
                return of({ error: true, message: `Error ${response.status}` });
            }
        }),
        catchError(err => {
            // Network or other error, handle appropriately
            console.error(err);
            return of({ error: true, message: err.message })
        })
    );
    data.subscribe({
        next: result => console.log(result),
        complete: () => console.log('done')
    });
}

// eslint-disable-next-line no-extend-native
const random = function(arr: Array<any>) {
    return arr[Math.floor((Math.random() * arr.length))];
};

export function streamFetch(dispatch: React.Dispatch<UpdateSentenceAction>) {
    return fetch('http://localhost:5000/api/3/search/dummy').then(response => response.body).then(body => {
        const reader = body && body.getReader();
        function strFromUtf8Ab(ab: Uint8Array) {
            // return decodeURIComponent(escape(String.fromCharCode.apply(null, ab)));
            const d = String.fromCharCode.apply(null, Array.from(ab));
            return "[" + d.replace(/(\n)/g, ',').slice(0, -1) + "]";
        }
        const stream = new ReadableStream({
            start(controller) {
                // The following function handles each data chunk
                function push() {
                    // "done" is a Boolean and value a "Uint8Array"
                    reader && reader.read().then(({ done, value }) => {
                        // Is there no more data to read?
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Get the data and send it to the browser via the controller
                        controller.enqueue(value);
                        // const str = "[" + new TextDecoder().decode(value)+ "]";
                        const str = strFromUtf8Ab(value);
                        const changes = JSON.parse(str);
                        changes.forEach((c: any) => {
                            dispatch({ type: "update", payload: {index: c.index, word: random(["aaa", "bbb", "ccc"])} });
                        });
                        //need to check how much latency it takes to update the store every X time - how it looks, when you render a list of items from the store.

                        // once we nail this we can continue with the store implementation
                        // also check that there is a

                        //String.fromCharCode.apply(null, value)});
                        push();
                    });
                };

                push();
            }
        });
        return new Response(stream, { headers: { "Content-Type": "application/jsonl" } })
    });
}