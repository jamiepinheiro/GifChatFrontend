import React, { Component } from 'react';

class Message extends Component {

    render() {
        return (
            <div>
                {this.props.messages.length}
                {this.props.messages.map((message) => <img key={message.id} src={message.url}/>)}
            </div>
        );
    }
}

export default Message;
