import React from "react";
import classes from "./Input.css";
const input = props => {
  let InputElement = null;
  let inputClassesElement = [classes.InputElement];
  let validationError = null;


  if (props.invalid && props.shouldValidate && props.touched) {
    inputClassesElement.push(classes.Invalid);
    validationError = <p className={classes.ValidationError} >{props.errorMessage}</p>;

  }

  switch (props.elementType) {
    case "input":
      InputElement = (
        <input
          className={inputClassesElement.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.clicked}
        />
      );
      break;
    case "textarea":
      InputElement = (
        <textarea
          className={inputClassesElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.clicked}
        />
      );
      break;
    case "select":
      InputElement = (
        <select
          className={inputClassesElement.join(" ")}
          value={props.value}
          onChange={props.clicked}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      InputElement = (
        <input
          className={inputClassesElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {InputElement}
      {validationError}
    </div>
  );
};

export default input;
