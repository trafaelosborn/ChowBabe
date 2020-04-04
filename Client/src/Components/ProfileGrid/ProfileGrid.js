import React, { useEffect, useState } from 'react'
import api from '../../Utils/api'
import { Container } from '@material-ui/core';
import ProfileCard from '../ProfileCard/ProfileCard'
import Grid from '@material-ui/core/Grid';

const gridStyle = {
    marginTop: '5%'
};

export default function ProfileGrid(props) {

	const renderProfileGrid = () => {
 poplate-profile-data
		return (<Grid container spacing={4} >
			{props.recipes.map((item, index) => {

		console.log('renderprofilegrid myRecipes:')
		console.log(myRecipes)
		return (<div>
			<Grid container spacing={4}>
			{myRecipes.map((item, index) => {
master
				return <Grid items >
					<ProfileCard 
						recipeName={item.recipeName}
						image={item.image}
						dietLabels={item.dietLabels}
					/>
				</Grid>
				
			})} 
poplate-profile-data
			 </Grid>)

			</Grid>
			</div>)
		
master
	}

    return (
        <div className="Grid">
            <Container style={gridStyle}>
				{renderProfileGrid()}
            </Container>
        </div>
    );
}
