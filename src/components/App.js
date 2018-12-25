import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    console.log('removeBinding');
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes
    });
  };

  editFish = (index, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[index] = updatedFish;
    this.setState({
      fishes
    });
  };

  deleteFish = (index, fish) => {
    const fishes = { ...this.state.fishes };
    fishes[index] = null;
    this.setState({
      fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addOrder = key => {
    const order = { ...this.state.order };

    order[key] = order[key] ? order[key] + 1 : 1;

    this.setState({
      order
    });
  };

  deleteOrder = key => {
    const order = { ...this.state.order };

    delete order[key];

    this.setState({
      order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Wes Is Cool" age={500} cool={true} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addOrder={this.addOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          deleteOrder={this.deleteOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          editFish={this.editFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
