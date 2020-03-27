import axios from "axios";

const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=8d8fa59906758f991bd7c52d34c5621f	";
const apiId = "&app_id=867a731f";
const maxTime = "&time=30";
const maxIngreds = `&ingr=10`;

const fetchRecipes = async (...ingredients) => {
  const mappedIngreds = ingredients
    .map((ingredient, idx) => {
      if (idx < ingredients.length - 1) {
        return ingredient + "+";
      } else {
        return ingredient;
      }
    })
    .join("");

  const url = `${apiURL}${mappedIngreds}${maxIngreds}${maxTime}${apiId}${apiKey}`;
  const res = await axios.get(url);
  const recipes = res.data;
  console.log(recipes);
  addToList(recipes)
};

fetchRecipes("zucchini", "broccoli", "carrots");

module.exports = reciperoutes