import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    //alert('You continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Heartly",
        address: {
          street: "Test Street",
          zipCode: "45666",
          country: "India"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
       let form = (
         <form>
           <input
             className={classes.Input}
             type="text"
             name="name"
             placeholder="Your Name"
           />
           <input
             className={classes.Input}
             type="email"
             name="email"
             placeholder="Your Email"
           />
           <input
             className={classes.Input}
             type="text"
             name="street"
             placeholder="Your Street"
           />
           <input
             className={classes.Input}
             type="text"
             name="postalCode"
             placeholder="Your Postal Code"
           />
           <Button btnType="Success" clicked={this.orderHandler}>
             ORDER
           </Button>
         </form>
         
       );
       if (this.state.loading) {
           
         form = <Spinner />;
       }
    return (

       
      <div className={classes.ContactData}>
          {form}
        
      </div>
    );
  }
}

export default ContactData;
