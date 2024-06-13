const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Inicialization
const app = express();

// Settings
app.set('port',process.env.PORT || 4000)
/* View engine configuration */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middlewares
app.use(morgan('dev'));
/* Allows to accept data from forms (false -> simple data, (for example: no images)) */
app.use(express.urlencoded({ extended: false }));
/* Send and receive json */
app.use(express.json());

let expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));

let crypto = require('crypto');
app.set('clave','abcdefg');
app.set('crypto',crypto);

// Flash middleware
const flashRouter = require("./routes/flash");
app.use("/*", flashRouter);

// Global variables
/* pass the session to the templates */
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// MongoDB configuration
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017/';
//'mongodb+srv://Shift:shift@shift.cgrkik1.mongodb.net/?retryWrites=true&w=majority&appName=Shift';
app.set('connectionStrings', url);

// Repositories
const usersRepository= require("./repositories/usersRepository.js");
/* Repository inicialization */
usersRepository.init(app, MongoClient);
require("./routes/users.js")(app, usersRepository);

const bookingsRepository= require("./repositories/bookingsRepository.js");
bookingsRepository.init(app, MongoClient);
const bicyclesRepository= require("./repositories/bicyclesRepository.js");
bicyclesRepository.init(app, MongoClient);
require("./routes/bookings.js")(app, bookingsRepository,bicyclesRepository);


// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

/* Protected urls for client */
const userSessionRouter = require('./routes/userSession');
app.use('/api/pay', userSessionRouter);

const usersRouter = require('./routes/users')
app.use('/users', usersRouter);
const bookingsRouter = require('./routes/bookings')
app.use('/bookings', bookingsRouter);
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


// Public
app.use(express.static(path.join(__dirname, 'public')));


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

module.exports = app;