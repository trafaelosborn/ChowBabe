import React, { useEffect } from 'react'
import api from '../../Utils/api'
import { Container } from '@material-ui/core';
import ProfileCard from '../ProfileCard/ProfileCard'
import Grid from '@material-ui/core/Grid';



const gridStyle = {
    marginTop: '5%'
};



export default function SearchGrid() {

useEffect(() => {
    api.getSaved(true, true).then((data) => {
        console.log(data)
    })
},[])

    return (
        <div classname="Grid">

            <Container style={gridStyle}>
                <Grid container spacing={4} >
                    <Grid items >
                        <ProfileCard />
                    </Grid>
                    <Grid items >
                        <ProfileCard />
                    </Grid>
                    <Grid items >
                        <ProfileCard />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
