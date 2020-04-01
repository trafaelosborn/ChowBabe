const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
	recipeName: {
		type: String,
		required: false
	}
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
