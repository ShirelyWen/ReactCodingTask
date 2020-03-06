import React, { useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import classes from "./RecordFilter.module.css";

function Filter(props) {
  //   console.log(props.rcs);
  const [searchValue, setSearchValue] = useState("");

  const filterHandler = event => {
    event.preventDefault();
    const value = searchValue;
    props.onClearedRecord();
    props.rcs.map(element => {
      for (let key in element) {
        if (
          String(element[key])
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          props.onFilterdRecord(
            element.id,
            element.name,
            element.email,
            element.phone,
            element.DOB,
            element.street,
            element.city,
            element.state,
            element.country
          );
        }
      }
    });
  };

  //   console.log(searchValue);
  return (
    <div>
      <form onSubmit={filterHandler} className={classes.SearchForm}>
        <Input
          elementType={"input"}
          changed={event => setSearchValue(event.target.value)}
        />
        <Button btnType="Success" disabled={false}>
          SEARCH
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    rcs: state.recordsBuilder.records,
    frcs: state.recordsFilter.filterRecords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddedRecord: (name, email, phone, DOB, street, city, state, country) =>
      dispatch({
        type: actionTypes.ADD_RECORD,
        formData: {
          name: name,
          email: email,
          phone: phone,
          DOB: DOB,
          street: street,
          city: city,
          state: state,
          country: country
        }
      }),
    onRemovedRecord: id =>
      dispatch({ type: actionTypes.REMOVE_RECORD, recordId: id }),
    onFilterdRecord: (
      id,
      name,
      email,
      phone,
      DOB,
      street,
      city,
      state,
      country
    ) =>
      dispatch({
        type: actionTypes.FILTER_RECORD,
        formData: {
          id: id,
          name: name,
          email: email,
          phone: phone,
          DOB: DOB,
          street: street,
          city: city,
          state: state,
          country: country
        }
      }),
    onClearedRecord: () => dispatch({ type: actionTypes.CLEAR_RECORD })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
