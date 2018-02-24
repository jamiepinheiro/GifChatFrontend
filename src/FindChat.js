import React, { Component } from 'react';
import axios from 'axios';

class FindChat extends Component {

  constructor(props) {
    super(props);
    this.findChat = this.findChat.bind(this);
  }

  findChat() {
    this.props.changePage('chat');
  }

  render() {
    return (<div>
            <button onClick={this.findChat}> Find Chat </button>
            </div>
          );
  }

  async componentDidMount() {
    try{
      var result = await axios.get('http://192.168.2.24:3000/newRoom');
      this.props.updateRoom(result.data);
    }catch (e) {
      console.log(e);
    }
  }
}

export default FindChat;
