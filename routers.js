// const express = require('express')
// const router = express.Router()
module.exports = (app) => {
    app.route('/').get((req,res) => {
        res.render('index')
    })

    /**
     * GET : Read
     * POST : Create
     * PUT : Update
     * DELETE : Delete
     * **/    
    app.use('/score', require('./controller/sys001')(app));   

    app.get('*', (req,res) => {
        res.end('wrong page')
    })
}

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}