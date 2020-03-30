import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchGrid from '../SearchGrid/SearchGrid'
import API from '../../Utils/api'
export default class Search extends Component {
    state = {
        search: ""
    }

    handleSearch = (event) => {
        event.preventDefault();

        console.log(this.state.search)
        API.getRecipe(this.state.search).then(function(data){
            console.log(data)
        })
      }

      handleInput  = (event) => {
          const {name, value} = event.target
          this.setState({
              [name]:value
          })
      }

    render() {
        return (
            <div>
                <Navbar search={this.state.search} handleInput={this.handleInput}  handleSearch={this.handleSearch} />
                <SearchGrid />
            </div>
        )
    }
}