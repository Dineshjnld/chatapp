import axios from 'axios';

const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const signup = async (email, password) => {
    try {
        const response = await axios.post('/auth/register', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        await axios.get('/auth/logout');
    } catch (error) {
        throw error;
    }
};

export default {
    login,
    signup,
    logout
};
