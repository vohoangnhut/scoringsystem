const express = require('express')
const path =  require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session');
const expressValidator = require('express-validator');
const app = express();
const io = require('socket.io');


app.use(express.static(path.join(__dirname,'public'),{maxAge: 0}))//315360000 }))

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Set router //Router o day =)) 
require('./routers')(app)

app.set('port', process.env.PORT || 9999)

const server = app.listen(app.get('port'), function(){console.log(`app is running on port ${app.get('port')}`)})

const socket = io(server);
/////SOCKET
socket.on('connection', function(socket){
    app.socket = socket;
    socket.on('channel_01', data => {
        //console.log(data);
    });
});