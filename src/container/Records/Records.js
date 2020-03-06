import React from "react";
import Record from "./Record/Record";
import RecordData from "../AddRecord/AddRecord";
import Filter from "../RecordFilter/RecordFilter";

import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import classes from "./Records.module.css";

function Records(props) {
  // console.log(props.rcs);
  return (
    <div className={classes.Records}>
      <div className={classes.col}>
        <RecordData />
      </div>
      <div className={classes.col}>
        <Filter />
        {props.frcs.length !== 0 ? (
          props.frcs.map(record => (
            <Record
              className={classes.RecordItem}
              key={record.id}
              name={record.name}
              email={record.email}
              phone={record.phone}
              DOB={record.DOB}
              street={record.street}
              city={record.city}
              state={record.state}
              country={record.country}
            />
          ))
        ) : (
          <p>There is no match record.</p>
        )}
      </div>
      <div className={classes.col}>
        {props.rcs.map(record => (
          <Record
            className={classes.RecordItem}
            key={record.id}
            name={record.name}
            email={record.email}
            phone={record.phone}
            DOB={record.DOB}
            street={record.street}
            city={record.city}
            state={record.state}
            country={record.country}
            clicked={() => props.onRemovedRecord(record.id)}
          />
        ))}
      </div>
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
      dispatch({ type: actionTypes.REMOVE_RECORD, recordId: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Records);
