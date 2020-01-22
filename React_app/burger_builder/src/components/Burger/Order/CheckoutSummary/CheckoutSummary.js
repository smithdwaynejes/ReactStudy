import React from "react";
import Burger from "../../Burger";
import Button from "../../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <div>Hope this Burger tasts good!</div>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
