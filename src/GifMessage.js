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
		try{
			var result = await axios.get('http://localhost:8000/gifs?search=' + this.state.message);
			var gifIndex = Math.round(Math.random() * (result.data.length - 1));
			var url = result.data[gifIndex].url;
			this.props.sendMessage(this.state.message, url);
		}catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<form onSubmit={this.getGif}>
				<input type="text" placeholder="type a message" value={this.state.message} onChange={this.messageChange} autoFocus/>
				<input type="submit" value="send"/>
			</form>
		);
	}

}

export default GifMessage;
