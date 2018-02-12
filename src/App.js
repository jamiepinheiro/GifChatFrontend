import React, { Component } from 'react';
import FindChat from './FindChat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'findChat',
      room: 0
    };
    this.updateRoom = this.updateRoom.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  updateRoom(newRoom) {
    this.setState({room: newRoom});
  }

  changePage(newPage) {
    this.setState({page: newPage});
  }

  render() {
    if (this.state.page === 'findChat') {
      return (<div> <FindChat updateRoom={this.updateRoom} changePage={this.changePage}/></div>
      );
    }else if (this.state.page === 'chat') {
      return (
        <div>
          Chatting!
        </div>
      );
    }

  }
}

export default App;
