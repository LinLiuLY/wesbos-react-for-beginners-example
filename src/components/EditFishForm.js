import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    editFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    index: PropTypes.string,
    fish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    })
  };

  onChange = event => {
    event.preventDefault();
    const updatedFish = {
      ...this.props.fish,
      [event.target.name]: event.target.value
    };
    this.props.editFish(this.props.index, updatedFish);
  };

  render() {
    const { name, price, status, desc, image } = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={this.onChange}
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={this.onChange}
        />
        <select name="status" value={status} onChange={this.onChange}>
          <option value="available">Fresh!</option>
          <option value="unavailale">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Desc"
          value={desc}
          onChange={this.onChange}
        />
        <input
          name="image"
          type="text"
          placeholder="Image"
          value={image}
          onChange={this.onChange}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Delete
        </button>
      </div>
    );
  }
}

export default EditFishForm;
