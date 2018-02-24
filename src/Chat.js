import React, { Component } from 'react';
import io from 'socket.io-client';
import GifSearch from './GifSearch.js';

class Chat extends Component {
	constructor(props) {
    	super(props);
		this.state = {
	      status: 'Waiting',
		  messages: []
	    };
    }

	componentDidMount() {
		var socket = io('http://192.168.2.24:3000/');
		socket.on('connect', () => {
			socket.emit('join', {room: this.props.room});
		});

		socket.on('status', (status) => {
			this.setState({status})
		});

		socket.on('gotMessage', (message) => {
			var newMessages = this.state.messages.push(message);
			this.setState({messages: newMessages});
		});
	}

	render() {
		return (<div>
					<h1>Status: {this.state.status}</h1>
					<GifSearch />
				</div>);
	}
}

export default Chat;
