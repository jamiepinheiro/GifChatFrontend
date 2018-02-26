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
					{this.props.messages.map((message, i) => {
						return (
							<div key={i} className={message.id === this.props.socketId ? 'float-right' : 'float-left'}>
								{message.id !== this.props.socketId && <code className="m-3">{this.props.partnerName}</code>}
								<img className="col-lg-8 col-md-8 col-sm-10" style={{width: '100%'}} src={message.url} alt="message"/><br/>
							</div>
						);
					})}
				</div>
				<div ref={0}> </div>
            </div>
        );
    }
}

export default Message;
