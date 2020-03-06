import React from "react";

import classes from "./Record.module.css";

const record = props => (
  <div onClick={props.clicked} className={classes.Record}>
    <p>Name: {props.name}</p>
    <p>E-mail: {props.email}</p>
    <p>Phone Number: {props.phone}</p>
    <p>Date of Birth: {props.DOB}</p>
    <p>
      Address: {props.street} {props.city} {props.state} {props.country}
    </p>
  </div>
);

export default record;
