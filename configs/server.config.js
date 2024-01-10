require('dotenv').config()
require('express-async-errors')
const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    { logger } = require('../middleware/logger'),
    corsOptions = require('./corsOption'),
    errorHandler = require('../middleware/errorHandler'),
    publicRoutes = require('../routes/public.routes')

module.exports = app =>{
    //app's middleware configuration
    app.use(logger)
    app.use(express.json())
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use('/', express.static(path.join(global.root, 'public')))
    app.use(morgan('dev'))

    //public routes
    app.use('/', require('../routes/root.routes'))
    app.use(publicRoutes)
    app.use('/auth', require('../routes/auth.routes'))

    //private routes
    app.use('users', require('../routes/user.routes'))

    //catch unmatch routes
    app.all('*', (req, res) =>{
        res.status(404)
        if(req.accepts('html')){
            res.sendFile(path.join(global.root, 'views', '404.html'))
        } else if(req.accepts('json')){
            res.json({ message: '404 Not Found'})
        }else{
            res.type('txt').send('404 Not Found')
        }
    })

    //setup error handler middleware
    app.use(errorHandler)

    return app
}