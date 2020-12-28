const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

require('dotenv').config();

const server = express();

server.use(bodyParser.json());
server.use(cors());

mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log('connected to DB')
);

server.use(express.static(path.join(__dirname, 'build')));
server.use('/api', routes);
server.listen(process.env.PORT, console.log('Server started at port 8000'));