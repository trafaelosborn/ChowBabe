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
 
		return (
			<Grid container spacing={4} >
			{props.recipes.map((item, index) => {
				return <Grid items >
					<ProfileCard 
						recipeName={item.recipeName}
						image={item.image}
						dietLabels={item.dietLabels}
					/>
				</Grid>
			})}
			</Grid>
		) 
	}

    return (
        <div className="Grid">
            <Container style={gridStyle}>
				{renderProfileGrid()}
            </Container>
        </div>
    );
}
