const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
require('./config/passport')(passport);

// Routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Socket.IO Connection
io.on('connection', socket => {
    console.log('New client connected');

    socket.on('join', (userId) => {
        socket.join(userId);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            message: message
        });

        await newMessage.save();

        io.to(receiverId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
