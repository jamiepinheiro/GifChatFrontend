import React, { Component } from 'react';
import io from 'socket.io-client';
import GifMessage from './GifMessage.js';
import Messages from './Messages.js';

class Chat extends Component {
	constructor(props) {
    	super(props);
		this.state = {
	      status: 'Waiting',
		  partnerName: '',
		  messages: []
	    };

		this.sendMessage = this.sendMessage.bind(this);
    }

	componentDidMount() {
		this.socket = io('http://localhost:8000/');
		this.setState({socketId: this.socket.id});
		this.socket.on('connect', () => {
			this.socket.emit('join', {room: this.props.room});
		});

		this.socket.on('status', (status) => {
			this.setState({status});
			if (this.state.status == 'Chating') {

				this.socket.emit('name', this.props.name);
			}
		});

		this.socket.on('newName', (name) => {
			if (name.id != this.socket.id) {
				this.setState({partnerName: name.name});
			}
		});

		this.socket.on('gotMessage', (message) => {
			var tempMessages = this.state.messages;
			tempMessages.unshift(message);
			this.setState({messages: tempMessages});
			console.log(this.state.messages);
		});
	}

	sendMessage(name, url) {
		this.socket.emit('createMessage', {name, url});
	}

	render() {
		return (
			<div>
				<h1>Status: {this.state.status}</h1>
				<h4>{this.props.name} is chating with {this.state.partnerName}</h4>
				<Messages socketId={this.state.socketId} messages={this.state.messages}/>
				<GifMessage sendMessage={this.sendMessage}/>
			</div>
		);
	}
}

export default Chat;
