import axios from 'axios';

const sendMessage = async (senderId, receiverId, message) => {
    try {
        const response = await axios.post('/messages/send', { senderId, receiverId, message });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getMessagesByUser = async (userId) => {
    try {
        const response = await axios.get(`/messages/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    sendMessage,
    getMessagesByUser
};
