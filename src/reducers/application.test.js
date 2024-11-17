import reducer from "reducers/application";

describe("Application Reducer", () => {
  xit("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrow();
  });
});
