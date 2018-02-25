import React, { Component } from 'react';

class Message extends Component {

    render() {
        return (
            <div>
                {this.props.messages.map((message, i) => <img key={i} src={message.url} alt="message"/>)}
            </div>
        );
    }
}

export default Message;
