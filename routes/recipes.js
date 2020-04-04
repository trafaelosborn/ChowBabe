const axios = require("axios")
const express = require("express");
const router = express.Router();
const auth = require("../config/middleware/auth");
const Recipe = require("../models/Recipe");

// @route   POST /api/recipes/find
// @desc    Get all saved recipes
// @access  Private
//router.get("/find", auth, (req, res) => {
	router.get("/find/:isCustom", (req, res) => {
		// Gets custom OR saved recipes depending on value of isCustom
		let findVal = { isCustom: req.params.isCustom }
		// Returns custom and saved recipes
		if ( req.params.isCustom === "all") findVal = {}
		Recipe.find(findVal).then(function(data) {
			res.json(data)
		})
		.catch(function(err){
			console.log(err)
		})
	});

// @route   GET /api/recipes/search/:searchterm
// @desc    Search for recipes
// @access  Public
router.get("/search/:searchterm", (req, res) => {
	const searchterm = req.params.searchterm;
	axios
		.get(
			"https://api.edamam.com/search?q=" +
				searchterm +
				"&app_id=867a731f&app_key=8d8fa59906758f991bd7c52d34c5621f"
		)
		.then(response => {
			res.json(response.data.hits);
		});
});

// @route   POST /api/recipes/calculate
// @desc    Calculate recipe nutrition
// @access  Public
router.post("/calculate", (req, res) => {
	axios.post("https://api.edamam.com/api/nutrition-details?app_id=66b96b13&app_key=78d4def55cec8e79502139f034b1812b", 
		req.body, 
		{ headers: { 'Content-Type': 'application/json' } })
	.then(result => {
		res.json(result.data);
	}).catch(err => { 
		console.log(err)
		if ( err.response.status === 555) {
			console.log('555 error: Recipe with insufficient quality to process correctly.')
			res.json({error: 555});
		}
	})
});

// @route   POST /api/recipes/save
// @desc    Save recipes to user profile
// @access  Private
// router.post("/save", auth, (req, res) => {
router.post("/save", (req, res) => {
	console.log("api recipes save");
	console.log(req.body);
	Recipe.create(req.body).then((data) => {
		res.json(data)
	})
});


module.exports = router;
