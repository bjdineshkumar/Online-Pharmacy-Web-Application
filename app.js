const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const constants = require("./src/config/constants.config");
const Response = require("./src/models/response.model");

const authRoute = require('./src/routes/auth.route');
const userRoute = require('./src/routes/user.route');
const productRoute = require('./src/routes/product.route');
const orderRoute = require('./src/routes/order.route');

const authService = require('./src/services/auth.service');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', authRoute);
app.use('/client', userRoute);
app.use(async(req, res, next) => {
    authService.authorize(req.headers.token).then((auth) => {
        if (!auth) {
            let response = new Response(false, {}, constants.SC401, "Unauthorized access");
            res.status(response.code).send(response);
        }
        next();
    }).catch((err) => {
        console.log(err);
        let response = new Response(false, {}, constants.SC401, "Unauthorized access");
        res.status(response.code).send(response);
    });
});
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let response = new Response(false, {}, constants.SC404, "URL not found");
    res.status(response.code).send(response);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    let response = new Response(false, {}, constants.SC500, "Internal Server Error");
    res.status(response.code).send(response);
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    const addr = server.address();
    const port = addr.port;
    console.log("Server started on port : " + port);
}