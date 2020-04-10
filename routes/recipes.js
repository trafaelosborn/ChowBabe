const axios = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../config/middleware/auth");
const Recipe = require("../models/Recipe");
const apiKey = "8d8fa59906758f991bd7c52d34c5621f";
const calcApiKey = '78d4def55cec8e79502139f034b1812b';
const searchAppId = "867a731f";
const calcAppId = "66b96b13";

// @route   POST /api/recipes/find
// @desc    Get all saved recipes
// @access  Private
//router.get("/find", auth, (req, res) => {
router.get("/find/:isCustom", (req, res) => {
	// Gets custom OR saved recipes depending on value of isCustom
	let findVal = { isCustom: req.params.isCustom };
	// Returns custom and saved recipes
	if (req.params.isCustom === "all") findVal = {};
	Recipe.find(findVal)
		.then(function (data) {
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
		});
});

// @route   POST /api/recipes/findById/:id
// @desc    Get recipe from DB
// @access  Private
//router.get("/findById/:id", auth, (req, res) => {
	router.get("/findById/:id", (req, res) => {
		const id = req.params.id;
		// Gets recipe data for the given recipeId
		Recipe.findById(id)
			.then(data => {
				res.json(data);
			})
			.catch( err => {
				console.log(err);
			});
	});

// @route   GET /api/recipes/search/:searchterm
// @desc    Search for recipes
// @access  Public
router.get("/search/:searchterm", (req, res) => {
	const searchterm = req.params.searchterm;
	axios
		.get(
			"https://api.edamam.com/search?q=" +
				searchterm + "&app_id=" + searchAppId + "&app_key=" + apiKey
		)
		.then((response) => {
			res.json(response.data.hits);
		});
});

// @route   POST /api/recipes/create
// @desc    Create a new recipe and save to user profile
// @access  Private
// router.post("/create", auth, (req, res) => {
router.post("/create", (req, res) => {
	// Create doc in mongo then get nutrient info and update by the new _id
	Recipe.create(req.body).then(newDoc => {
		// build nutrient api request object
		const calcObj = {
			title: newDoc.recipeName,
			ingr: newDoc.ingredientItems,
			prep: newDoc.directionItems		
		}
		axios
		.post(
			"https://api.edamam.com/api/nutrition-details?app_id=" + calcAppId + "&app_key=" + calcApiKey,
			calcObj,
			{ headers: { "Content-Type": "application/json" } }
		)
		.then((result) => {
			// Update totalNutrients with the results of the nutrient query
			Recipe.findByIdAndUpdate({_id: newDoc._id}, {
					totalNutrients: result.data.totalNutrients, 
					totalDaily: result.data.totalDaily
				}).then( docToUpdate => {
					res.json(docToUpdate);
				})	
		})
		.catch((err) => {
			console.log(err);
			if (err.response.status === 555) {
				console.log("555 error: Recipe with insufficient quality to process correctly.");
				res.json({ error: 555 });
			}
		});
	}).catch(err => { console.log(err) });
	
	
});

// @route   POST /api/recipes/save
// @desc    Save recipes to user profile
// @access  Private
// router.post("/save", auth, (req, res) => {
router.post("/save", (req, res) => {
	// Mongoose does not play well with the raw req data so we have to
	// create a new object for it.
	const newObj = {
		thirdPartyRecipe: {
			uri: req.body.thirdPartyRecipe.uri ? req.body.thirdPartyRecipe.uri : null,
			label: req.body.thirdPartyRecipe.label ? req.body.thirdPartyRecipe.label : null,
			image: req.body.thirdPartyRecipe.image ? req.body.thirdPartyRecipe.image : null,
			source: req.body.thirdPartyRecipe.source ? req.body.thirdPartyRecipe.source : null,
			yield: req.body.thirdPartyRecipe.yield ? req.body.thirdPartyRecipe.yield : null,
			dietLabels: [req.body.thirdPartyRecipe.dietLabels]
				? [req.body.thirdPartyRecipe.dietLabels]
				: null,
			healthLabels: [req.body.thirdPartyRecipe.healthLabels]
				? [req.body.thirdPartyRecipe.healthLabels]
				: null,
			cautions: [req.body.thirdPartyRecipe.cautions]
				? [req.body.thirdPartyRecipe.cautions]
				: null,
			ingredientLines: [req.body.thirdPartyRecipe.ingredientLines]
				? [req.body.thirdPartyRecipe.ingredientLines]
				: null,
			calories: req.body.thirdPartyRecipe.calories ? req.body.thirdPartyRecipe.calories : null,
			totalNutrients: req.body.thirdPartyRecipe.totalNutrients ? req.body.thirdPartyRecipe.totalNutrients : null,
			totalDaily: req.body.thirdPartyRecipe.totalDaily ? req.body.thirdPartyRecipe.totalDaily : null
		},
		isCustom: false,
	};
	Recipe.create(newObj)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});

module.exports = router;
