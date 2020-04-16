import React from "react";
import CreateNav from "../CreateNav/CreateNav";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import RecipeForm from "../RecipeForm/RecipeForm";
import WebcamCapture from "../WebcamCapture/WebcamCapture";

export default function CreateRecipe() {
	return (
		<div>
			<CreateNav />
			<WebcamCapture />
		</div>
	);
}
