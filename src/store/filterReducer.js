import * as actionTypes from "./action";

const initialState = {
  filterRecords: []
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_RECORD:
      const newRecord = {
        id: action.formData.id,
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
        filterRecords: state.filterRecords.concat(newRecord)
      };

    case actionTypes.CLEAR_RECORD:
      return {
        filterRecords: []
      };

    default:
      return state;
  }
};

export default filterReducer;
