import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  static propTypes = {
    addOrder: PropTypes.func,
    index: PropTypes.string,
    details: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    })
  };

  render() {
    const { addOrder, index, details } = this.props;
    const { image, name, status, desc, price } = details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="fish-price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => addOrder(index)}>
          {isAvailable ? 'Add to Cart' : 'Sold out'}
        </button>
      </li>
    );
  }
}

export default Fish;
