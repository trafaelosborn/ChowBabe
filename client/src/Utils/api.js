import axios from "axios";
import fs from 'fs';

export default {
	////////////////////
	// Recipe functions
	getRecipe: function (searchterm) {
		return axios.get("/api/recipes/search/" + searchterm);
	},

	// Send custom recipe data to /api/recipes/calculate route
	getNutrition: function (recipeInfo) {
		return axios.post("/api/recipes/calculate", recipeInfo, {
			headers: { "Content-Type": "application/json" },
		});
	},

	// Get recipe category when user clicks profile sidebar
	getRecipes: function (category) {
		// category determines if we're searching for custom recipes, saved recipes, or both
		let isCustom = true;
		if (category === "savedrecipes") {
			isCustom = false;
		} else if (category === "allrecipes") {
			isCustom = "all";
		}
		return axios.get("/api/recipes/find/" + isCustom, {
			headers: { "Content-Type": "application/json" },
		});
	},
	
	// Get a single recipe by id
	getRecipeById: function (id) {
		return axios.get("/api/recipes/findById/" + id, {
			headers: { "Content-Type": "application/json" },
		});
	},

	// Create a new recipe using RecipeForm
	createRecipe: function (recipeData) {
		return axios.post("/api/recipes/create", recipeData)
	},

	// Save a recipe found via the API
	saveRecipe: function (recipeData) {
		axios.post("/api/recipes/save", recipeData)
	},

	// Delete a recipe from the ProfileCard
	deleteRecipe: function (id) {
		axios.post("/api/recipes/delete/" + id);
	},

	// save image from image capture
	saveImage: function (imageData) {
		// Remove header from data and keep the string
		let base64Image = imageData.split(';base64,').pop();
		// Send to server as string and convert it to an image
		axios.post("/api/images/save", {imageData: base64Image})
	},

	ocr: function() {
		console.log('client api ocr')
		// test ocr with existing photo
		axios.post("/api/images/ocr").then(res => {
			console.log('client api ocr');
			console.log(res.data.message);
		})

	},

	//////////////////
	// User functions
	register: function (userData) {
		axios
			.post("/api/users", userData, { headers: { "Content-Type": "application/json" } })
			.then((result) => {
				// set local storage using id as key
				localStorage.setItem("recipetoken", result.data.token);
				// redirect to user profile
				window.location = "/profile/";
			});
	},

	// Login user
	login: function (userData) {
		return axios
			.post("/api/auth", userData, { headers: { "Content-Type": "application/json" } })
			.then((result) => {
				// Save token so we can access it later
				localStorage.setItem("recipetoken", result.data.token);
				// redirect to user's profile
				window.location = "/profile/";
			});
	},

	// Get user info. Use id to look up specific user. Pass token to verify current user's status.
	getUserInfo: function (id) {
		const token = localStorage.getItem('recipetoken');
		return axios.get("/api/users/info/" + id, { headers: { "x-auth-token": token } });
	},

	// Get logged in user's info 
	getUserId: function () {
		const token = localStorage.getItem("recipetoken");
		return axios.get("/api/users/info/", { headers: { "x-auth-token": token } });
	},

	
};
