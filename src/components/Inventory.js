import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import firebase from 'firebase';
import Login from './Login';
import base from '../base';

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
      debugger;
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

    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  render() {
    const Logout = <button onClick={this.logout}>Logout Out!</button>;

    const {
      fishes,
      editFish,
      loadSampleFishes,
      deleteFish,
      addFish
    } = this.props;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {Logout}
        </div>
      );
    }

    return (
      <div>
        <div className="inventory">Inventory!!!</div>
        {Logout}
        {Object.keys(fishes).map(key => (
          <EditFishForm
            fish={fishes[key]}
            key={key}
            index={key}
            editFish={editFish}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load sample fishes!</button>
      </div>
    );
  }
}

export default Inventory;
