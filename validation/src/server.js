const express = require('express');

const connect = require('./config/db');

const UserController = require('./controller/product.controller');


const app = express();
app.use(express.json());

app.use("/users" , UserController)

const start = async () => {
    await connect();

    app.listen(2244 , () => {
        console.log("listen the port 2244");
    })
}

module.exports = start;