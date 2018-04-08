import React, { Component } from 'react';
import axios from 'axios';

class FindChat extends Component {

  constructor(props) {
    super(props);
    this.nameChange = this.nameChange.bind(this);
    this.findChat = this.findChat.bind(this);
    try{
        axios.get("https://gifchat1server.herokuapp.com/");
    }catch (e) {
        console.log(e);
    }
  }

  nameChange(event) {
      var name = event.target.value;
      this.props.setName(name);
  }

  async findChat(e) {
	  e.preventDefault();
	  if(this.props.name.length > 0){
	      try{
	          var result = await axios.get('https://gifchat1server.herokuapp.com/newRoom');
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
        <form className="form-group mx-auto text-center col-8" onSubmit={this.findChat}>
            {this.props.page === 'findChat' &&
				<div className="form-group">
					<input className="form-control text-center" type="message" placeholder="What's your name?" value={this.props.name} onChange={this.nameChange} autoFocus/>
				</div>}
            <button className={"btn btn-primary col-8 " + (this.props.name.length > 0 ? '' : 'disabled')} type="submit">Find a Chat</button>
        </form>
    );
  }

}

export default FindChat;
