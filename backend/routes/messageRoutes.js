const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/send', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            message: message
        });

        await newMessage.save();

        res.status(201).send(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .populate('sender', 'email')
            .populate('receiver', 'email')
            .sort({ timestamp: 1 });

        res.send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
