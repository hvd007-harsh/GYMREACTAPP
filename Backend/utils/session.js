const session = require('express-session');

const sess = session({
    secret:'qwertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge:4320000000
    }
})
module.exports = sess;