import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends Component {
  render() {
    return (
      <div>
        <div className="inventory">Inventory!!!</div>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load sample fishes!
        </button>
      </div>
    );
  }
}

export default Inventory;