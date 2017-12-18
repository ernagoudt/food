module.exports = (app, client) => {
  app.get("/", (req, res) => {
    res.render ("search")
  }),

  app.post("/search", (req, res) => {
  const query ={
    text: `Select * from ingredients
    WHERE ingredients.ingredient LIKE '%${req.body.search}%'`
  }

  client.query(query, (err, result) => {
    if (err) throw err
    var ingredients = result.rows

    res.render("result", {ingredients: ingredients})
  })
  })
}

