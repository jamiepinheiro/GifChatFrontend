import React, { Component } from 'react';
import axios from 'axios';

class FindChat extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <h1> Finding you a chat!</h1>;
  }

  async componentDidMount() {
    try{
      var result = await axios.get('https://gifchat1.herokuapp.com/newRoom');
      this.props.updateRoom(result.data);
    }catch (e) {
      console.log(e);
    }
  }
}

export default FindChat;
