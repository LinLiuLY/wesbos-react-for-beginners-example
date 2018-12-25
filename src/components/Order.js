import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    deleteOrder: PropTypes.func
  };

  displayOrderedFish = fishId => {
    const { fishes, order } = this.props;
    if (!fishes[fishId]) return null;
    const { name, price, status } = fishes[fishId];
    const count = order[fishId];
    const isAvailable = status === 'available';
    const transitionOptions = {
      classNames: 'order',
      fishId,
      timeout: { enter: 500, exit: 500 }
    };
    if (!isAvailable || !fishId) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={fishId}>
            `$
            {name ? name : 'Fish'} sold out`
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={fishId}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            <span>lbs {name}</span>
            <span> $ {formatPrice(order[fishId] * price)}</span>
            <button onClick={() => this.props.deleteOrder(fishId)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  getTotal = orderedFishIds => {
    const { order, fishes } = this.props;

    return orderedFishIds.reduce((current, fishId) => {
      if (!fishes[fishId]) return null;

      const { price, status } = fishes[fishId];
      const count = order[fishId];
      const isAvailable = status === 'available';
      if (isAvailable) {
        return current + count * price;
      }
      return current;
    }, 0);
  };

  render() {
    const { order } = this.props;

    const orderedFishIds = Object.keys(order);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          <ul className="order">
            {orderedFishIds.map(this.displayOrderedFish)}
          </ul>
        </TransitionGroup>
        <div className="total">
          Total: {formatPrice(this.getTotal(orderedFishIds))}
          <strong />
        </div>
      </div>
    );
  }
}

export default Order;
