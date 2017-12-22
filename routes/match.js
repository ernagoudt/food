var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = (app) => {
	app.get("/match", (req, res) => {
		var searchInput = req.query.searchCrit
		fs.readFileAsync('foodrecipes.json', 'utf-8')
		.then(data => {
			data = data.replace(/\n/g, "\\n")
			data = JSON.parse(data)
			let recipeMatch = []
			for(i=0; i < data.length; i++) {
				for(j=0; j < data[i].results.length; j++) {
					if(data[i].results[j].ingredients.toLowerCase().startsWith(searchInput.toLowerCase())) {
						recipeMatch.push(data[i].results[j])
					}
				}
			}
			return recipeMatch
		}).then((recipeMatch) => {
				if (recipeMatch.length === 0) {
					res.redirect("/")
				}
				else if (recipeMatch.length > 0) {
					res.render("match", {recipeMatch: recipeMatch})
				}
		})
	})
}



