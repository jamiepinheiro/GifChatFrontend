import React, { Component } from 'react';
import GifSelector from './GifSelector.js';

class GifSearch extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			search: 'Random'
		}
		this.messageChange = this.messageChange.bind(this);
    }

	messageChange(event) {
		var search = event.target.value;
		if (search.length >= 2) {
			if(this.state.timeout) clearTimeout(this.state.timeout);
			this.state.timeout = setTimeout(() => {
				this.setState({search});
		    }, 750);
		}
	}

	render() {
		return (
			<div>
				<GifSelector search={this.state.search} />
				<input type="text" placeholder="type a message" onChange={this.messageChange}/>
			</div>
		);
	}

}

export default GifSearch;
