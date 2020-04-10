import axios from "axios";

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
	getRecipes: function (category, id) {
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
		axios.post("/api/recipes/create", recipeData);
	},

	// Save a custom recipe found via the API
	saveRecipe: function (recipeData) {
		console.log("utils api save recipe");
		console.log(recipeData);
		axios.post("/api/recipes/save", recipeData);
	},

	//////////////////
	// User functions
	register: function (userData) {
		axios
			.post("/api/users", userData, { headers: { "Content-Type": "application/json" } })
			.then((res) => {
				// set local storage using id as key
				localStorage.setItem(res.data.user.id, res.data.token);
				// redirect to user profile
				axios
					.get("/api/users/profile/" + res.data.user.id, {
						headers: { "x-auth-token": res.data.token },
					})
					.then((user) => {
						window.location = "/profile/" + user.data;
					});
			});
	},

	// Login user
	login: function (userData) {
		return axios
			.post("/api/auth", userData, { headers: { "Content-Type": "application/json" } })
			.then((res) => {
				// When user logs in, generate a new token and get the user id from the database
				const id = res.data.user.id;
				const token = res.data.token;
				// Save token so we can access it later
				localStorage.setItem(res.data.user.id, token);
				// redirect to user's profile
				axios
					.get("/api/users/profile/" + id, { headers: { "x-auth-token": token } })
					.then((user) => {
						console.log();
						window.location = "/profile/" + user.data;
					});
			});
	},

	// Get user info
	getUserInfo: function (id) {
		// Using hard coded token until I store it somewhere...
		const token = localStorage.getItem(id);
		return axios.get("/api/users/info/" + id, { headers: { "x-auth-token": token } });
	},
};
