import React, { Component } from 'react';
import io from 'socket.io-client';
import GifMessage from './GifMessage.js';
import Messages from './Messages.js';
import FindChat from './FindChat.js';

class Chat extends Component {
	constructor(props) {
    	super(props);
		this.state = {
	      status: 'Waiting',
		  partnerName: '',
		  messages: []
	    };

		this.sendMessage = this.sendMessage.bind(this);
		this.socketSetup = this.socketSetup.bind(this);
		this.endChat = this.endChat.bind(this);
    }

	componentDidMount() {
		this.socketSetup();
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.room !== this.props.room) this.socketSetup();
	}

	socketSetup() {
		this.socket = io('http://localhost:8000/');
		this.setState({socketId: this.socket.id});
		this.socket.on('connect', () => {
			this.socket.emit('join', {room: this.props.room});
		});

		this.socket.on('status', (status) => {
			this.setState({status});
			if (this.state.status === 'Chating') {
				this.socket.emit('name', this.props.name);
			}else if (this.state.status === 'Ended') {
				this.socket.close();
				this.setState({partnerName: '', messages: []});
			}
		});

		this.socket.on('newName', (name) => {
			if (name.id !== this.socket.id) {
				this.setState({partnerName: name.name});
			}
		});

		this.socket.on('gotMessage', (message) => {
			var tempMessages = this.state.messages;
			tempMessages.unshift(message);
			this.setState({messages: tempMessages});
		});
	}

	sendMessage(name, url) {
		this.socket.emit('createMessage', {name, url});
	}

	endChat() {
		this.socket.close();
		this.setState({status: 'Ended', partnerName: '', messages: []});
	}

	render() {
		return (
			<div>
				<h1>Status: {this.state.status}</h1>
				<h4>{this.props.name} is chating with {this.state.partnerName}</h4>
				<Messages socketId={this.state.socketId} messages={this.state.messages}/>
				<GifMessage sendMessage={this.sendMessage}/>
				{this.state.status !== "Ended" && <button onClick={this.endChat}>End Chat</button>}
				{this.state.status === "Ended" && <FindChat updateRoom={this.props.updateRoom}/>}
			</div>
		);
	}
}

export default Chat;
