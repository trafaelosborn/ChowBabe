import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Container } from '@material-ui/core';
import Card from '../Card/Card'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const gridStyle = {
    color: 'blue',
    marginTop: '5%'
  };

export default function SearchGrid() {
   

    return (
        <div classname="Grid">
            <Container style={gridStyle}>
            <Grid container spacing={4} >
                <Grid item s >
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
            </Container>
        </div>

    );
}
