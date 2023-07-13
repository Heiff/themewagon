const Express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('dotenv').config();
const fileUpload = require("express-fileupload");
const cookie = require("cookie-parser");
const app = Express();
const port = process.env.PORT;

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(cookie());
app.use(fileUpload());
app.use(cors())
app.use('/',router)

app.use(Express.static(process.cwd() + "/uploads"));

app.listen(port,()=>{
    console.log(port);
})