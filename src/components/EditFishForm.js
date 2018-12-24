import React, { Component } from 'react';

class EditFishForm extends Component {
  onChange = event => {
    event.preventDefault();
    const edittedFish = { ...this.props.fish };
    edittedFish[event.target.name] = event.target.value;
    this.props.editFish(this.props.index, edittedFish);
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
