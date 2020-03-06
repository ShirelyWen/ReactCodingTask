import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./AddRecord.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { updateObject, checkValidity } from "../../shared/utility";
import * as actionTypes from "../../store/action";

function RecordData(props) {
  const [record, setRecord] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true,
        isName: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "tel",
        placeholder: "Your Phone Number"
      },
      value: "",
      validation: {
        required: true,
        isPhoneNumber: true
      },
      valid: false,
      touched: false
    },
    DOB: {
      elementType: "input",
      elementConfig: {
        type: "date"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true,
        isStreet: true
      },
      valid: false,
      touched: false
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "City"
      },
      value: "",
      validation: {
        required: true,
        isCity: true
      },
      valid: false,
      touched: false
    },
    state: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "NSW", displayValue: "NSW" },
          { value: "VIC", displayValue: "VIC" },
          { value: "QLD", displayValue: "QLD" },
          { value: "NT", displayValue: "NT" },
          { value: "ACT", displayValue: "ACT" },
          { value: "SA", displayValue: "SA" },
          { value: "TAS", displayValue: "TAS" },
          { value: "WA", displayValue: "WA" }
        ]
      },
      value: "NSW",
      validation: {},
      valid: true
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text"
      },
      value: "Australia",
      validation: {
        required: true
      },
      valid: true,
      touched: false
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const addHandler = event => {
    event.preventDefault();

    props.onAddedRecord(
      record.name.value,
      record.email.value,
      record.phone.value,
      record.DOB.value,
      record.street.value,
      record.city.value,
      record.state.value,
      record.country.value
    );
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedRecordElement = updateObject(record[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        record[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedRecord = updateObject(record, {
      [inputIdentifier]: updatedRecordElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedRecord) {
      formIsValid = updatedRecord[inputIdentifier].valid && formIsValid;
      // console.log(formIsValid);
    }
    setRecord(updatedRecord);
    setFormIsValid(formIsValid);
  };

  const recordArray = [];
  for (let key in record) {
    recordArray.push({
      id: key,
      config: record[key]
    });
  }
  // console.log(recordArray[3].config.value);
  // console.log(record.name.value);
  let form = (
    <form onSubmit={addHandler}>
      {recordArray.map(record => (
        <Input
          key={record.id}
          label={record.id}
          elementType={record.config.elementType}
          elementConfig={record.config.elementConfig}
          value={record.config.value}
          invalid={!record.config.valid}
          shouldValidate={record.config.validation}
          touched={record.config.touched}
          changed={event => inputChangedHandler(event, record.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        SUBMIT
      </Button>
    </form>
  );
  return (
    <div className={classes.RecordData}>
      <h4>Enter your Record Infromation</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    rcs: state.recordsBuilder.records
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordData);
