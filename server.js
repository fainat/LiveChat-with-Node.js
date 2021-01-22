const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/users");
const liveChatWindow = require("./routes/chatwindow");
const indexRoute = require("./routes/index");

// create user.json
const usersRepositories = require('./reprositories/userRepo');
// create message.json
const messagesRepo = require('./reprositories/messRepo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


// --- chat section

app.use("/auth", indexRoute);
app.use("/profile", userRoutes);
app.use("/", liveChatWindow);

app.listen( PORT, function () {
    console.log('Live-Chat server strategy is success ' + PORT);
});