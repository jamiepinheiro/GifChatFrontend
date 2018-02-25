import React, { Component } from 'react';
import axios from 'axios';

class FindChat extends Component {

  constructor(props) {
    super(props);
    this.nameChange = this.nameChange.bind(this);
    this.findChat = this.findChat.bind(this);
  }

  nameChange(event) {
      var name = event.target.value;
      this.props.setName(name);
  }

  async findChat(e) {
	  e.preventDefault();
	  if(this.props.name.length > 0) {
	      try{
	          var result = await axios.get('http://localhost:8000/newRoom');
	          this.props.updateRoom(result.data);
	      }catch (e) {
	          console.log(e);
	      }
	      if (this.props.page === 'findChat') {
	          this.props.changePage('chat');
	      }
	  }
  }

  render() {
    return (
        <form className="form-group mx-auto text-center" onSubmit={this.findChat}>
            {this.props.page === 'findChat' &&
				<div className="form-group">
					<input className="form-control" type="message" placeholder="what's your name?" value={this.props.name} onChange={this.nameChange} autoFocus/>
				</div>}
            <button className={"btn btn-primary col-6 " + (this.props.name.length > 0 ? '' : 'disabled')} type="submit">Find a Chat</button>
        </form>
    );
  }

}

export default FindChat;
