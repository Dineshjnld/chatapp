import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div>
            <h3>Message List</h3>
            <ul>
                {messages.map(message => (
                    <li key={message._id}>
                        <p>{message.sender.email}: {message.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
