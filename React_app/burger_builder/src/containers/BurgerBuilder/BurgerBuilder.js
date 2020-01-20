import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Aux from "../../hoc/Aux";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.8,
  meat: 1.6,
  bacon: 0.9
};
class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing:false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(itKeys => {
        return ingredients[itKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    const updateCount = oldIngredientCount + 1;
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type] = updateCount;

    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    if (oldIngredientCount <= 0) {
      return;
    }
    const updateCount = oldIngredientCount - 1;
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type] = updateCount;

    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
  };

  purchaseHandler = () => {
      this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
      this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
      alert('You Continue!');
  }
  render() {
    const disableIngredients = { ...this.state.ingredients };
    for (let key in disableIngredients) {
      disableIngredients[key] = disableIngredients[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
          purchaseCanceled = {this.purchaseCancelHandler}
          purchaseContinue = {this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingridientAdded={this.addIngredientHandler}
          ingridientRemoved={this.removeIngredientHandler}
          disabled={disableIngredients}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
