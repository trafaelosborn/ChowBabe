const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require('config');
const auth = require("../config/middleware/auth");
const fs = require('fs');

//////////////////////
// AWS 
const AWS = require('aws-sdk');
const BUCKET = config.get('BUCKET');
const ID = config.get('ID');
const SECRET = config.get('SECRET');
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (imageFile, filename) => {
	const fileContent = fs.readFileSync(imageFile);
	// Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET,
        Key: filename, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

// @route   POST /api/images/save
// @desc    Save images test route
// @access  Private
// router.post("/save", auth, (req, res) => {
	router.post("/save", (req, res) => {

		console.log('server api images save')
		// save image to root of the application
		fs.writeFile('image.png', req.body.imageData, {encoding: 'base64'}, function(err, imageFile) {
			console.log('File created:');
			console.log(fs.statSync('image.png'));
		});
		// Upload file to bucket
		uploadFile('image.png', 'testUpload.png');
	});

/////////////////////
// OCR
const BASE_URL = "http://www.ocrwebservice.com/restservices/processDocument"
const ARGS = "?language=english&gettext=true&tobw=true&pagerange=1&newline=1"
const LOGIN = "dandismuke";
const LIC = "2326C799-A994-4C45-9695-A7EABF96A2A6";

// @route   POST /api/images/ocr
// @desc    Post images to api for OCR
// @access  Private
// router.post("/ocr", auth, (req, res) => {
	router.post("/ocr", (req, res) => {

		console.log('server api images ocr')
		console.log('url: ' + BASE_URL + ARGS)
		console.log()
		// ocr
		axios({
			method: 'post',
			url: BASE_URL + ARGS,
			data: 'test.png',
			auth: {
				username: LOGIN,
				license: LIC
			}
			
			
		}).then(result => {
			console.log('ocr happened: ');
			console.log(result)
			res.json(result.response.status)
		}).catch(err => {
			console.log(err);
			res.json(err)

		})
		


	});



module.exports = router;