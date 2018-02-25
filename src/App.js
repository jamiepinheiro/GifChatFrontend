import React, { Component } from 'react';
import FindChat from './FindChat';
import Chat from './Chat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'findChat',
      room: 0,
      name: ''
    };
    this.updateRoom = this.updateRoom.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setName = this.setName.bind(this);
  }

  setName(name) {
      this.setState({name});
  }

  updateRoom(newRoom) {
    this.setState({room: newRoom});
  }

  changePage(newPage) {
    this.setState({page: newPage});
  }

  render() {
    if (this.state.page === 'findChat') {
      return (<div> <FindChat page="findChat" name={this.state.name} setName={this.setName} updateRoom={this.updateRoom} changePage={this.changePage}/></div>
      );
    }else if (this.state.page === 'chat') {
      return (
        <Chat name={this.state.name} room={this.state.room} updateRoom={this.updateRoom}/>
      );
    }

  }
}

export default App;
