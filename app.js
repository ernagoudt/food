var express = require('express')
var app = express()
var session = require('express-session');
const pg = require("pg")
const Client = pg.Client
const bodyParser = require("body-parser")

app.use(express.static("public"))
app.use (bodyParser.urlencoded({extended:true}))
app.set ('view engine', 'pug')
require('dotenv').load();
// const env = require("./env.json")
app.use (session({
  secret: '23j354jl45j',
  resave: true,
  saveUnininitialized: true
}))
debugger
const client = new Client({
  user: process.env.databaseUser,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432
})

require("./routes/index.js")(app)
require("./routes/search.js")(app, client)

client.connect((err) => console.log(err))

app.listen(process.env.webport, () => {
    console.log("listening to port", process.env.webport)
});
