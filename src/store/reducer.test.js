import reducer from "./reducer";
import * as actionTypes from "./action";

describe("record table builder reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      records: []
    });
  });

  it("should store the reocrd information upon submit the form", () => {
    expect(
      reducer(
        {
          records: []
        },
        {
          type: actionTypes.ADD_RECORD,
          formData: {
            name: "Sam",
            email: "Sam@gmail.com",
            phone: "0426999999",
            DOB: "2012-03-03",
            street: "123 unit",
            city: "Sydney",
            state: "NSW",
            country: "Australia"
          }
        }
      )
    ).toEqual({
      records: [
        {
          id: 1,
          name: "Sam",
          email: "Sam@gmail.com",
          phone: "0426999999",
          DOB: "2012-03-03",
          street: "123 unit",
          city: "Sydney",
          state: "NSW",
          country: "Australia"
        }
      ]
    });
  });
});
