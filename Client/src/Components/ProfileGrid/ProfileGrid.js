import React, { useEffect, useState } from 'react'
import api from '../../Utils/api'
import { Container } from '@material-ui/core';
import ProfileCard from '../ProfileCard/ProfileCard'
import Grid from '@material-ui/core/Grid';

const gridStyle = {
    marginTop: '5%'
};

export default function ProfileGrid(props) {
	const [myRecipes, setMyRecipes] = useState([]);	

	useEffect(() => {	
		api.getSaved(true, true).then((data) => {
			const newArr = data.data.map((item, index) => {
				if ( item.isCustom ) {
					return {
						recipeName: item.recipeName,
						dietLabels: "Custom Recipe",					
						image: "https://img1.looper.com/img/gallery/the-untold-truth-of-gremlins/intro-1537807042.jpg"
					}
				} else {
					return {
						recipeName: item.thirdPartyRecipe.label,
						dietLabels: item.thirdPartyRecipe.dietLabels.join(", "),					
						image: item.thirdPartyRecipe.image
					}
				}
			})
			setMyRecipes(newArr); 
		})
	},[])

	const renderProfileGrid = () => {
		console.log('renderprofilegrid myRecipes:')
		console.log(myRecipes)
		return (<div>
			{myRecipes.map((item, index) => {
				return <Grid items >
					<ProfileCard 
						recipeName={item.recipeName}
						image={item.image}
						dietLabels={item.dietLabels}
					/>
				</Grid>
			})} 
			</div>)
		
	}

    return (
        <div className="Grid">
            <Container style={gridStyle}>
                <Grid container spacing={4} >
                   {/*  <Grid items >
                        <ProfileCard />
					</Grid> */} 
					{renderProfileGrid()}
                </Grid>
            </Container>
        </div>
    );
}
