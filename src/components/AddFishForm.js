import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func.isRequired
  };

  createFish = event => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };
    this.props.addFish(fish);
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input ref={this.nameRef} name="name" type="text" placeholder="Name" />
        <input
          ref={this.priceRef}
          name="price"
          type="text"
          placeholder="Price"
        />
        <select ref={this.statusRef} name="status">
          <option value="available">Fresh!</option>
          <option value="unavailale">Sold Out!</option>
        </select>
        <textarea ref={this.descRef} name="desc" placeholder="Desc" />
        <input
          ref={this.imageRef}
          name="image"
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
