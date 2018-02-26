import React, { Component } from 'react';
import FindChat from './FindChat';
import Chat from './Chat';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'findChat',
			room: 0,
			name: '',
			center: true
		};
		this.updateRoom = this.updateRoom.bind(this);
		this.changePage = this.changePage.bind(this);
		this.setName = this.setName.bind(this);
		this.changeCenter = this.changeCenter.bind(this);
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

	changeCenter(center) {
		this.setState({center});
	}

	render() {
		return (
			<div className={"row h-100 " + (this.state.center ? 'align-items-center bg' : '')}>
				<div className={"container "+ (this.state.center ? 'col-xl-4 col-lg-6 col-md-8 col-sm-12 text-center' : 'col-12')}>
					{this.state.page === 'findChat' &&
						<div>
							<h1 className="display-3 text-white">Gif Chat</h1>
							<p className="lead text-white">Chat with strangers online using the language of gifs!</p>
							<FindChat page="findChat" name={this.state.name} setName={this.setName} updateRoom={this.updateRoom} changePage={this.changePage}/>
						</div>}
					{this.state.page === 'chat' && <Chat name={this.state.name} room={this.state.room} updateRoom={this.updateRoom} changeCenter={this.changeCenter}/>}
				</div>
			</div>
		);
	}
}

export default App;
