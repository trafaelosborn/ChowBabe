const axios = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../config/middleware/auth");
const fs = require('fs');
// AWS Vars
const AWS = require('aws-sdk');
const BUCKET = 'chow-babe/publicprefix';
const ID = 'AKIAJZSHKZWYJ3L5E6OA';
const SECRET = '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' 
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
	router.post("/save", (req, res, next) => {
		console.log('server api images save')
		// save image to root of the application
		fs.writeFile('image.png', req.body.imageData, {encoding: 'base64'}, function(err, imageFile) {
			console.log('File created:');
			console.log(fs.statSync('image.png'));
		});
		uploadFile('image.png', 'testUpload.png');

	});

module.exports = router;