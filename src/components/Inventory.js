import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    editFish: PropTypes.func,
    deleteFish: PropTypes.func
  };
  render() {
    const fishes = this.props.fishes;
    return (
      <div>
        <div className="inventory">Inventory!!!</div>
        {Object.keys(fishes).map(key => (
          <EditFishForm
            fish={fishes[key]}
            key={key}
            index={key}
            editFish={this.props.editFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load sample fishes!
        </button>
      </div>
    );
  }
}

export default Inventory;
