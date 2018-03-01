import React, { Component } from 'react';
import axios from 'axios';

class GifMessage extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			message: ''
		}
		this.messageChange = this.messageChange.bind(this);
		this.getGif = this.getGif.bind(this);
    }

	messageChange(event) {
		this.setState({message: event.target.value});
	}

	async getGif(e) {
		e.preventDefault();
		var name = this.state.message;
		this.setState({message: ''});
		try{
			var result = await axios.get('https://gifchat1server.herokuapp.com/gifs?search=' + this.state.message);
			var gifIndex = Math.round(Math.random() * (result.data.length - 1));
			var url = result.data[gifIndex].url;
			this.props.sendMessage(name, url);
		}catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div className="fixed-bottom bg-light col-12 text-center mx-auto p-3">
				<hr className="my-4"/>
				<form className="form-inline" onSubmit={this.getGif}>
					<input className="form-control col-10" type="text" placeholder="type a message" value={this.state.message} onChange={this.messageChange} autoFocus/>
					<button className="input-group-btn btn btn-primary col-2" type="submit">Send</button>
				</form>
			</div>
		);
	}

}

export default GifMessage;
