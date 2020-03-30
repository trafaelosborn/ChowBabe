import React from 'react'
import axios from 'axios'

export default {
    getRecipe: function() {
        return axios.get("/api/recipes")
    }
    
}