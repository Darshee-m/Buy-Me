require("dotenv").config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const PORT = process.env.PORT;

// Creating DB connection - replace values in .env file according to your db setup

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

module.exports = { db };



app.use(express.json());


app.use(express.static(__dirname + '/public'));


//middleware to read req.body.<params>
//CREATE USER
app.get("/", (req, res) => {
  // res.sendStatus(200);
  res.sendFile(__dirname + '/public/login.html')
});

console.log('Path', __dirname)

app.post("/createUser", async (req, res) => {
  const user = req.body.userName;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM User WHERE userName = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    const sqlInsert = "INSERT INTO User (userName, password) VALUES (?,?)";
    const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);

    // ? will be replaced by values
    // ?? will be replaced by string

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
}); //end of app.post()
