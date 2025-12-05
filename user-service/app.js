require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

// health
app.get('/', (req, res) => res.send('User Service OK'));

module.exports = app;
