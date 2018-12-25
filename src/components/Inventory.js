import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import firebase from 'firebase';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    editFish: PropTypes.func,
    deleteFish: PropTypes.func,
    storeId: PropTypes.string
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, {
      context: this
    });

    if (!store.owner) {
      base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    const { fishes, editFish, loadSampleFishes, deleteFish } = this.props;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

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
