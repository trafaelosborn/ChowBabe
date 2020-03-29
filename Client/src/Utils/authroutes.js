import axios from "axios";

// Set headers
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
}

export default {
	register: function(userData) {
		axios.post('/api/users', userData, config).then(res => {
			// redirect to user profile
			axios.get("/api/profile/" + res.data.user.id);
		});
	},
	login: function(userData) {
		return axios.post('/api/auth', userData, config).then(res => {
			window.location = "/Profile"
		});
	},
	getProfile: function(id) {
		return axios.get("/api/profile", id).then(res => {
			
			window.location = "/profile";
		});
	},
}