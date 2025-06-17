const express = require('express');
const Cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB(); //lidhja e databazes
const app = express(); //inicializimi i express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors());

//route fillestar
app.get('/', (req, res) => {
    res.send('Serveri me express punon!')
});

// si kjo do vendoset per entitetet qe do ruash ne debugger(shmb librat)
// app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.use(errorHandler); //errror middleware

app.listen(port, () => console.log(`Server listening on ${port}`));
