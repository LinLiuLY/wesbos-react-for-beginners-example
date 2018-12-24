import React, { Component } from 'react';

class EditFishForm extends Component {
  render() {
    const { name, price, status, desc, image } = this.props.fish;
    console.log('fish', this.props.fish);
    return (
      <div className="fish-edit">
        <input name="name" type="text" placeholder="Name" value={name} />
        <input name="price" type="text" placeholder="Price" value={price} />
        <select name="status" value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailale">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="Desc" value={desc} />
        <input name="image" type="text" placeholder="Image" value={image} />
      </div>
    );
  }
}

export default EditFishForm;
