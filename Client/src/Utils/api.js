import axios from "axios";

export default {
	getRecipe: function(searchterm) {
		return axios.get("/api/recipes/" + searchterm);
	},

	getSaved: function(isCustom, findAll){
		console.log(isCustom)
		// return axios.get("/api/recipes/find", {params: {isCustom, findAll}})
		return axios.get("/api/recipes/find?isCustom=true")
	},

	// Send custom recipe data to /api/recipes/calculate route
	getNutrition: function(recipeInfo) {
		return axios.post("/api/recipes/calculate", recipeInfo, 
			{ headers: { "Content-Type": "application/json" } })
	},
	register: function(userData) {
		axios
			.post("/api/users", userData, { headers: { "Content-Type": "application/json" } })
			.then(res => {
				// set local storage using id as key
				localStorage.setItem(res.data.user.id, res.data.token);
				// redirect to user profile
				axios
					.get("/api/users/profile/" + res.data.user.id, {
						headers: { "x-auth-token": res.data.token }
					})
					.then(user => {
						window.location = "/profile/" + user.data;
					});
			});
	},
	login: function(userData) {
		return axios
			.post("/api/auth", userData, { headers: { "Content-Type": "application/json" } })
			.then(res => {
				// When user logs in, generate a new token and get the user id from the database
				const id = res.data.user.id;
				const token = res.data.token;
				// Save token so we can access it later
				localStorage.setItem(res.data.user.id, token);
				// redirect to user's profile
				axios
					.get("/api/users/profile/" + id, { headers: { "x-auth-token": token } })
					.then(user => {
						window.location = "/profile/" + user.data;
					});
			});
	},
	// Load user info...call on profile page to populate with name, saved recipes, etc.
	getUserInfo: function(id) {
		// Using hard coded token until I store it somewhere...
		const token = localStorage.getItem(id);
		return axios.get("/api/users/info/" + id, { headers: { "x-auth-token": token } });
	}
};
