const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const app = express();


connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }, 
});

io.on('connection', (socket) => {
    console.log(`Driver connected: ${socket.id}`);

    socket.on('updateLocation', (data) => {
        console.log('Location update:', data);
        io.emit('locationUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('Driver disconnected');
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});