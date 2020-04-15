import React, { Component, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Card from "../Card/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import API from "../../Utils/api";
import Background from "../../Assets/Img/searchbackground.jpg";

const gridStyle = {
	color: "blue",
	marginTop: "5%",
};

export default function SearchGrid(props) {
	const [userId, setUserId] = React.useState({ id: "" });

	const getLoggedOnUserId = () => {
		API.getUserId().then((result) => {
			setUserId({
				userId: result.data._id,
			});
		});
	};

	useEffect(() => {
		getLoggedOnUserId();
	}, []);

	return (
		<Paper>
			<Container style={gridStyle}>
				<Grid container spacing={4}>
					{props.content.map(function (recipe, index) {
						return (
							<Grid items>
								<Card recipe={recipe} userId={userId} content={props.content} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Paper>
	);
}
