import React from 'react'
import Navbar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecipeForm from '../RecipeForm/RecipeForm'
import RecipeTabs from '../RecipeTabs/RecipeTabs'
export default function RecipePage() {
    return (
        <div>
            <Navbar />
            <RecipeTabs />
        </div>
    )
}
