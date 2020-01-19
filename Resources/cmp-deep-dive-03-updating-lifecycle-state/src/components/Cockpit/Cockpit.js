import React, { useEffect, useRef, useContext } from "react";

import classes from "./Cockpit.css";
import AuthContext from "../../context/auth_context";
const cockpit = props => {

  const Logout = "Logout";
  const Login = "Login";

  const toggleBtnRef = useRef(null);
  const auth_context = useContext(AuthContext);

  useEffect(() => {
    console.log("[cockpit.js] useEffect...");

    setTimeout(() => {
      alert("Saved data to cloud...");
    }, 1000);
    toggleBtnRef.current.click();
    return () => {
      console.log("[cockpit.js] cleanup by use effect");
    };
  }, []);

  useEffect(() => {
    console.log("[cockpit.js] 2nd use of useeffect");
    return () => {
      console.log("'[cockpit.js] cleanby use effect2");
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={auth_context.login}> {auth_context.authenticated ? Logout:Login}</button>
    </div>
  );
};

export default React.memo(cockpit);
