import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          min_length: 7
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  authHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email, this.state.controls.password);
  }
  
  inputChangedHandler = (event, inputIdentifier) => {
    const updateControls = {
      ...this.state.controls
    };
    const updatedControlElement = {
      ...updateControls[inputIdentifier]
    };
    updatedControlElement.value = event.target.value;
    updatedControlElement.valid = this.checkValidity(
      updatedControlElement.value,
      updatedControlElement.validation
    );
    updatedControlElement.touched = true;
    updateControls[inputIdentifier] = updatedControlElement;

    let formIsValid = true;
    for (let inputIdentifier in updateControls) {
      formIsValid = updateControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updateControls, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      <form onSubmit={this.authHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => {dispatch(actionTypes.auth(email, password))}
    }
}

export default connect(null,mapDispatchToProps)(Auth);