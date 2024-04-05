import React, { useState } from 'react';
import messageService from '../../services/messageService';

const MessageInput = ({ senderId, receiverId }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        try {
            await messageService.sendMessage(senderId, receiverId, message);
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;
