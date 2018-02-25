import React, { Component } from 'react';

class NameEdit extends Component {

    constructor(props) {
      super(props);
      this.nameChange = this.nameChange.bind(this);
    }

    nameChange(event) {
        this.props.setName(event.target.value);
    }

    render() {
      return (
          <input type="text" placeholder="what's your name?" onChange={this.nameChange} autoFocus/>
      );
    }

}
