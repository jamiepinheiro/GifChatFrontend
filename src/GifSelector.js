import React, { Component } from 'react';
import axios from 'axios';

class GifSelector extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			gifs: []
		};
    }

	async componentWillReceiveProps() {
		try{
	      var gifs = await axios.get('http://192.168.2.24:3000/gifs?search=' + this.props.search);
		  this.setState({gifs: gifs.data});
		  console.log(this.state.gifs);
	    }catch (e) {
	      console.log(e);
	    }
	}

	render() {
		return (
			<div>
				{this.state.gifs.map(gif => gif.name)}
			</div>
		);
	}

}

export default GifSelector;
