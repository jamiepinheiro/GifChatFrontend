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
		setTimeout(() => {
			this.refs[0].scrollIntoView({block: 'end', behavior: 'smooth' });
		}, 300);
	}

    render() {
        return (
            <div className="container pt-5">
				<div style={{height: '10vh'}}></div>
				<div className="row col-12" style={{width: '100%'}}>
					{this.props.messages.map((message, i) => {
						return (
							<div className="col-12">
								<div key={i} className={"col-lg-4 col-md-6 col-sm-10 " + (message.id === this.props.socketId ? 'float-right text-right' : 'float-left text-left')}>
									<code className="m-3">{message.id === this.props.socketId ? 'You' : this.props.partnerName}</code>
									<img className="" style={{width: '100%'}} src={message.url} alt="message"/><br/>
								</div>
							</div>
						);
					})}
				</div>
				<div ref={0} style={{height: '10vh'}}></div>
            </div>
        );
    }
}

export default Message;
