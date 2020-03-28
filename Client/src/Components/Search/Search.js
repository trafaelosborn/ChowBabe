import React from 'react'
import Navbar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchGrid from '../SearchGrid/SearchGrid'

export default function Search() {
    return (
        <div>
            <Navbar />
            <SearchGrid />
        </div>
    )
}
