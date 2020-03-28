import axios from "axios";

const handleSearch = function(event) {
  event.preventDefault();
   axios.get('https://api.edamam.com/search?q=broccoli&app_id=867a731f&app_key=8d8fa59906758f991bd7c52d34c5621f')
 .then((response) => {
   console.log(response)
 })
 }