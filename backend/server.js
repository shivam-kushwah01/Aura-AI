require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");
const userRouter = require("./routes/user");
const cors = require('cors');


const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true 
}));

app.use(session({
    secret : 'mysecret',
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

if(uri) mongoose.connect(uri); console.log('MongoDB connected successfully');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use("/", userRouter);

app.use((req, res) => {
    res.send('Page Not Found');
})

app.listen(port, 
    console.log(`app listen at port ${port}`)
);