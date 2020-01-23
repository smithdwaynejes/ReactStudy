import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }
  render() {
    let order = <Order />;
    if (this.state.orders) {
      order = this.state.orders.map(ig => {
        return (
          <Order key={ig.id} price={ig.price} ingredients={ig.ingredients} />
        );
      });
    }

    return <div>{order}</div>;
  }
}

export default Orders;
