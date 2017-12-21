var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = (theApp) => {
	theApp.get("/", (req, res) => {
		res.render("indexRecipes", {
			title: "indexRecipes",
		})
	})

	theApp.post("/match", (req, res) => {
		fs.readFileAsync('foodrecipes.json', 'utf-8')			
		.then(data => {		
			data = data.replace(/\n/g, "\\n")				
			data = JSON.parse(data)
			let recipeMatch = []
			for(i=0; i < data.length; i++) {
				for(j=0; j < data[i].results.length; j++) {
					if(data[i].results[j].ingredients.toLowerCase().startsWith(req.body.autocomplete)) {
						recipeMatch.push(data[i].results[j])
					}
				} console.log("match", recipeMatch)
			}
			return recipeMatch
		}).then((recipeMatch) => {
				if (recipeMatch.length === 0) {
					res.send("Match not found, try again!")
				}
				else if (recipeMatch.length > 0) {	
					res.render('match', {
						title: 'match',
						recipeMatch: recipeMatch
					})							
				}				
			})
	})
}


	