import React from 'react'
import axios from 'axios'

export default {
    getRecipe: function(searchterm) {
        return axios.get("/api/recipes/" + searchterm)
    }
    
}