import React from "react";
import { render } from "@testing-library/react";
import App from "./App3";
import { SentenceStore } from "./mobx/store";

import { Provider } from "mobx-react";
import { when } from "mobx";

const wrap = (store: SentenceStore) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("Mobx App", () => {
  let store: SentenceStore;

  beforeAll(() => {
    store = new SentenceStore();
  });

  test("renders title", () => {
    const { getByText } = render(wrap(store));
    const linkElement = getByText(/Aggregations/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("should display aggregations",() => {
    const { getByText } = render(wrap(store));
    when(
      () => store.sentences.length > 0,
      () => {
        expect(store.sentences[0]).toEqual({});
        expect(getByText(/aaa/i)).toBeInTheDocument();
      }
    );
  });
});
