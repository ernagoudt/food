var express = require('express')
var app = express()
var session = require('express-session');
const pg = require("pg")
const Client = pg.Client
const bodyParser = require("body-parser")
var cookieparser = require('cookie-parser')

app.use (cookieparser());
app.use(express.static("public"))
app.use (bodyParser.urlencoded({extended:true}))
app.set ('view engine', 'pug')
require('dotenv').load();
app.use (session({
  secret: '23j354jl45j',
  resave: true,
  saveUnininitialized: true
}))

const client = new Client({
  user: process.env.databaseUser,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432
})

require("./routes/index.js")(app, client)
require("./routes/match.js")(app)

client.connect((err) => console.log(err))

// initializing database
const query ={
  text:`CREATE TABLE IF NOT EXISTS ingredients(
    id serial primary key,
    ingredient text,
    co2 decimal,
    category integer,
    kilometers decimal);`
}

client.query(query, (err, result) => {
  if (err) throw err
})

app.listen(process.env.webport, () => {
    console.log("listening to port", process.env.webport)
});
