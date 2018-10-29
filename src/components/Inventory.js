import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends Component {
  render() {
    return (
      <div>
        <div className="inventory">Inventory!!!</div>
        <AddFishForm addFish={this.props.addFish} />
      </div>
    );
  }
}

export default Inventory;
