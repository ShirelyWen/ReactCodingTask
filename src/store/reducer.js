import * as actionTypes from "./action";

const initialState = {
  records: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECORD:
      const newRecord = {
        // id: Math.random(),
        id: state.records.length + 1,
        name: action.formData.name,
        email: action.formData.email,
        phone: action.formData.phone,
        DOB: action.formData.DOB,
        street: action.formData.street,
        city: action.formData.city,
        state: action.formData.state,
        country: action.formData.country
      };
      return {
        ...state,
        records: state.records.concat(newRecord)
      };
    case actionTypes.REMOVE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record.id !== action.recordId)
      };
    default:
      return state;
  }
};

export default reducer;
