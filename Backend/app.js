const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const user_route = require('./route/user_route');
const cart_route = require('./route/cart_route');
const product_route = require('./route/product_route');
const order_route = require('./route/order_route');
const sess = require('./utils/session');
const db = require('./db/db');
const dotenv = require('dotenv');


const cookieParser = require('cookie-parser');
dotenv.config();


const PORT = 4000 || process.env.PORT;
const app = express();
db();


app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(sess);

app.use('/user', user_route);
app.use('/cart', cart_route);
app.use('/product', product_route);
app.use('/order', order_route)
app.use('*', (req, res) => {
    res.send("Page Not Found 404")
})


app.listen(PORT, () => {
    console.log(`The server is connected with ${PORT}`);
});