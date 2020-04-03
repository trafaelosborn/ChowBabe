import React, {useState, useEffect} from 'react'
import API from '../../Utils/api';

// Proof of concept for sending a nutrition info request to edamam and rendering the results. 

export default function Test () {
	const [nutritionInfo, setNutritionInfo] = useState({})
	// If response is an error code instead of the desired info, set boolean state variable
	// and display the appropriate error message instead of the recipe info. 
	// For some reason I can't change the value of isError but I'm leaving this is to work on later.
	const [isError, setError] = useState(false);
	
	useEffect(() => {
		// Test data for the edamam nutrient calculator
		const recipeInfo = {
			"title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
			"prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
			"yield": "About 15 servings",
			"ingr": [
			  "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
			  "7 cloves garlic, minced",
			  "1 tablespoon caraway seeds, crushed",
			  "4 teaspoons salt",
			  "Freshly ground pepper to taste",
			  "1 teaspoon olive oil",
			  "1 medium onion, peeled and chopped",
			  "3 cups sourdough rye bread, cut into 1/2-inch cubes",
			  "1 1/4 cups coarsely chopped pitted prunes",
			  "1 1/4 cups coarsely chopped dried apricots",
			  "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
			  "2 teaspoons chopped fresh rosemary",
			  "1 egg, lightly beaten",
			  "1 cup chicken broth, homemade or low-sodium canned"
			]
		  }

		API.getNutrition(recipeInfo)
			.then(results => {
				setNutritionInfo(results.data);
				/* if ( results.data.error ) {
					if ( results.data.error === 404 ) {
						setNutritionInfo({
							error: results.data.error,
							message: 'ERROR 404: The specified URL was not found or could not be retrieved.' 
						});
					} else if ( results.data.error === 422 ) {
						setNutritionInfo({
							error: results.data.error,
							message: 'ERROR 422: Could not parse the recipe or extrace the nutritional info.' 
						});
					} else if ( results.data.error === 555 ) {
						setNutritionInfo({
							error: results.data.error,
							message: 'ERROR 555: Recipe with insufficient quality to process correctly.' 
						});
					}
					setError(!isError);
					console.log({isError})
					console.log({nutritionInfo})			
				} else {	
					setNutritionInfo(results.data);
				} */
			})
			.catch(err => console.log(err));
	}, []);

		return (
			<div>
				<h1>Nutrient Search Results</h1>
				<ul>
					<li>{nutritionInfo.uri ? nutritionInfo.uri : null}</li>
					<li>{nutritionInfo.yield}</li>
					<li>{nutritionInfo.calories}</li>
					<li>{nutritionInfo.dietLabels ? nutritionInfo.dietLabels.join(", ") : null}</li>
					<li>{nutritionInfo.healthLabels ? nutritionInfo.healthLabels.join(", ") : null}</li>
					<li>{nutritionInfo.cautions ? nutritionInfo.cautions.join(", ") : null}</li>
				</ul>
			</div>)
}
