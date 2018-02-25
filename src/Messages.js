import React, { Component } from 'react';

class Message extends Component {

	constructor(props) {
		super(props);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		this.refs[0].scrollIntoView({block: 'end', behavior: 'smooth' });
	}

    render() {
        return (
            <div className="container pt-5">
				<div>
					{this.props.messages.map((message, i) => <div><img key={i} src={message.url} alt="message"/><br/></div>)}
				</div>
				<div ref={0}> </div>
            </div>
        );
    }
}

export default Message;
