import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Container } from '@material-ui/core';
import Card from '../Card/Card'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    Grid: {
      flexGrow: 1,
    },
    
  }));

  export default function SearchGrid() {
    const classes = useStyles();
  
    return (
        <div classname="Grid">
    
        <Grid container spacing={4}>
          <Grid item s>
            <Card />
          </Grid>
          <Grid item s>
          <Card />
          </Grid>
          <Grid item s>
          <Card />
          </Grid>
          <Grid item s>
            <Card />
          </Grid>
          <Grid item s>
          <Card />
          </Grid>
          <Grid item s>
          <Card />
          </Grid>         
        </Grid>
        </div>
        
    );
  }
