import React, { Component } from 'react';

class Order extends Component {
  displayOrderedFish = fishId => {
    const { fishes, order } = this.props;

    const { name, price, status } = fishes[fishId];
    const isAvailable = status === 'available';
    if (!isAvailable || !fishId) {
      return (
<<<<<<< HEAD
        <li>
=======
        <li key={fishId}>
>>>>>>> Display order total amount.
          `$
          {name ? name : 'Fish'} sold out`
        </li>
      );
    }
    return (
      <li key={fishId}>
        FishName: {name}
        totalCount: {order[fishId] * price}
      </li>
    );
  };

  render() {
    const { order, fishes } = this.props;
    const orderedFishIds = Object.keys(order);

    const total = orderedFishIds.reduce((current, fishId) => {
      const { price, status } = fishes[fishId];
      const count = order[fishId];
      const isAvailable = status === 'available';
<<<<<<< HEAD

      if (isAvailable) {
        return current + count * price;
      }

=======
      if (isAvailable) {
        return current + count * price;
      }
>>>>>>> Display order total amount.
      return current;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderedFishIds.map(this.displayOrderedFish)}</ul>
        <div className="total">
          Total: {total}
          <strong />
        </div>
      </div>
    );
  }
}

export default Order;
