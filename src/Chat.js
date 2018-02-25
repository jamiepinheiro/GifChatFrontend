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
				this.props.changeCenter(false);
			}else if (this.state.status === 'Ended') {
				this.socket.close();
				this.setState({partnerName: '', messages: []});
				this.props.changeCenter(true);
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
		this.props.changeCenter(true);
	}

	render() {
		return (
			<div className="h-100 col-12">
				{this.state.status === 'Waiting' &&
				 	<div>
						<div className="row justify-content-center m-1">
							<h3 className="text-white">Searching for partner</h3>
						</div>
						<div className="row justify-content-center">
							<div className="loader"></div>
						</div>
					</div>}

				{this.state.status === 'Chating' &&
					<div>
						<div className="row m-3">
							<h4 className="col-9">You are now chating with <code>{this.state.partnerName}</code></h4>
							<div className="col-3">
								<button className="btn btn-danger float-right" onClick={this.endChat}>End Chat</button>
							</div>
						</div>
						<hr/>
						<Messages socketId={this.state.socketId} messages={this.state.messages}/>
						<GifMessage sendMessage={this.sendMessage}/>
					</div>}

				{this.state.status === "Ended" &&
					<div>
						<div className="row justify-content-center m-1">
							<h3 className="text-white">You chat has ended!</h3>
						</div>
						<FindChat name={this.props.name} updateRoom={this.props.updateRoom}/>
					</div>}
			</div>
		);
	}
}

export default Chat;
