import React from 'react';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

const Chat = ({ user, setUser }) => {
    return (
        <div>
            {!user ? (
                <>
                    <Login setUser={setUser} />
                    <Signup setUser={setUser} />
                </>
            ) : (
                <h2>Welcome, {user.email}</h2>
                // {/* Implement chat functionality here */}
            )}
        </div>
    );
};

export default Chat;
