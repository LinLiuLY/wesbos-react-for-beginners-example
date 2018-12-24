import React, { Component } from 'react';

class Order extends Component {
  displayOrderedFish = fishId => {
    const { fishes, order } = this.props;
    if (!fishes[fishId]) return null;
    const { name, price, status } = fishes[fishId];
    const isAvailable = status === 'available';
    if (!isAvailable || !fishId) {
      return (
        <li key={fishId}>
          `$
          {name ? name : 'Fish'} sold out`
        </li>
      );
    }
    return (
      <li key={fishId}>
        <div>FishName: {name}</div>
        <div>totalCount: {order[fishId] * price}</div>
        <button onClick={() => this.props.deleteOrder(fishId)}>&times;</button>
      </li>
    );
  };

  render() {
    const { order, fishes } = this.props;

    const orderedFishIds = Object.keys(order);
    const total = orderedFishIds.reduce((current, fishId) => {
      if (!fishes[fishId]) return null;

      const { price, status } = fishes[fishId];
      const count = order[fishId];
      const isAvailable = status === 'available';
      if (isAvailable) {
        return current + count * price;
      }
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
