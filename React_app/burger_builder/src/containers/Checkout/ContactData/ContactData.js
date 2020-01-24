import React, { Component } from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid Name"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid Street"
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          min_length: 5,
          max_length: 5
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid Zip Code"
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid Country"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid Email"
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    //alert('You continue!');
    let orderFormData = {};
    for (let item in this.state.orderForm) {
      orderFormData[item] = this.state.orderForm[item].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderContactData: orderFormData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules) {
        return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.min_length) {
      isValid = value.length >= rules.min_length && isValid;
    }

    if (rules.max_length) {
      isValid = value.length <= rules.max_length && isValid;
    }

    return isValid;
  };

  orderFormChangeHandler = (event, orderFormIdentifier) => {
    let updatedOrderForm = {
      ...this.state.orderForm
    };

    let updatedFormElement = {
      ...updatedOrderForm[orderFormIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    updatedOrderForm[orderFormIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid & formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let inputElementArray = [];

    for (let key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let inputElement = inputElementArray.map(ele => {
      return (
        <Input
          key={ele.id}
          elementType={ele.config.elementType}
          elementConfig={ele.config.elementConfig}
          value={ele.config.value}
          invalid={!ele.config.valid}
          shouldValidate={ele.config.validation}
          touched={ele.config.touched}
          errorMessage={ele.config.errorMessage}
          clicked={event => this.orderFormChangeHandler(event, ele.id)}
        />
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElement}

        <Button disabled = {!this.state.formIsValid} btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps) (ContactData);
