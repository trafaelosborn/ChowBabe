const axios = require("axios")

function reciperoutes(app) {
  app.get("/api/recipes", function(req,res) {
    axios.get('https://api.edamam.com/search?q=broccoli&app_id=867a731f&app_key=8d8fa59906758f991bd7c52d34c5621f')
    .then((response) => {
      console.log(response.data.hits)
      res.json(response.data.hits)
    })
  })
}

module.exports = reciperoutes