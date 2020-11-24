/****************************
**** Server Initializers ****
****************************/

//Initialize express
const express = require('express');
const app = express();

//Reads .env file for PORT number
require('dotenv').config();
const port = process.env.PORT || 3008;

//Allows us to recognize JSON, strings, and array objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Initialize and Setup CORS
const cors = require('cors');
const whitelist = ['https://fifth-hour-frontend.herokuapp.com','http://localhost:3000', 'http://localhost:3008', 'https://fifth-hour-backend.herokuapp.com'];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || origin === undefined)
            callback(null, true);
        else
            callback(new Error('Not allowed by cors'));
    }
};
app.use(cors(corsOptions));

//Initialize method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Initialize mongoose with mongoDB
const mongoURI = process.env.MONGODB_URI + "/watchstore";
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//Initialize and use express-session
const session = require('express-session');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

/*********************
***** Controllers ****
**********************/

//Products Controller
const productsController = require('./controllers/products.js');
app.use('/watches', productsController);

//Users Controller
const userController = require('./controllers/users.js')
app.use('/users', userController);

//Sessions Controller
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController);

/*************************
**** Server Listeners ****
*************************/

//mongoose listeners to connect to MongoDb
mongoose.connection.on('error', (err) => console.log("*** Error connecting to MongoDB ***"));
mongoose.connection.on('connected', () => console.log("*** MongoDB connected at " + mongoURI + " ***"));
mongoose.connection.on('disconnected', () => console.log("*** MongoDB disconnected at " + mongoURI + " ***"));

//express listener to open port
app.listen(port, () => {
    console.log("*** Express server running at localhost:" + port + " ***");
});

//delete this later
app.get('/', (req, res) => {
    res.send("You're not blocked by cors!")
})
