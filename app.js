const dotenv = require("dotenv");
const express =  require('express');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

app.use(express.json());


app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require('./routes/login'));


app.listen(PORT, console.log("Server started at port: " + PORT))


