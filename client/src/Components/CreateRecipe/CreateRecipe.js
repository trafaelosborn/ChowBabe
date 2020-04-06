import React from 'react'
import Navbar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecipeForm from '../RecipeForm/RecipeForm'

export default function CreateRecipe() {
    return (
        <div>
            <Navbar />
            <RecipeForm />
        </div>
    )
}
