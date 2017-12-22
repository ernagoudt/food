module.exports = (app, client) => {
  app.get("/", (req, res) => {
    res.render ("search")
  }),

  app.post("/search", (req, res) => {

  const query ={
    text: `Select * from ingredients
    WHERE ingredients.ingredient LIKE '%${req.body.search}%'
    ORDER BY ingredients.co2 ASC`
  }

  client.query(query, (err, result) => {
    if (err) throw err
    var ingredients = result.rows
    if(req.body.ajax == "true") {
      if(result.rows.length === 0) res.send({ingredients: ingredients})
      else res.send({ingredients: ingredients})
    }
    else {
      res.render("inform", {ingredients: ingredients})
    }
  })
  })
}
