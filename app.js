var express = require('express')
var app = express()
var session = require('express-session');
const pg = require("pg")
const Client = pg.Client
const bodyParser = require("body-parser")

app.use (bodyParser.urlencoded({extended:true}))
app.set ('view engine', 'pug')

app.use (session({
  secret: '23j354jl45j',
  resave: true,
  saveUnininitialized: true
}))

require('dotenv').load();
const client = new Client({
  user: process.env.username,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432
})

require("./routes/search.js")(app, client)

client.connect((err) => console.log(err))

app.listen(process.env.webport, () => {
    console.log("listening to port", process.env.webport)
});
