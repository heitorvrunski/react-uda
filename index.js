const Joi = require('joi');
const config = require('config');
const startUpDebugger = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api', home);
app.use('/api/courses', courses);
app.use(express.json());

if (app.get('env') == 'development') {
    startUpDebugger('Morgan Started...');
    app.use(morgan('tiny'));
}
app.use(logger);


const PORT = process.env.PORT || 5000;
app.listen(PORT);