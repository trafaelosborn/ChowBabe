const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../config/middleware/auth");
const AWS = require("aws-sdk");
const fs = require("fs");
const User = require("../models/User");

//////////////////////
// AWS
const BUCKET = process.env.BUCKET || config.get("BUCKET");
const ID = process.env.ID || config.get("ID");
const SECRET = process.env.SECRET || config.get("SECRET");

const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

const uploadFile = (imageFile, filename) => {
	const fileContent = fs.readFileSync(imageFile);
	// Setting up S3 upload parameters
	const params = {
		Bucket: BUCKET,
		Key: filename, // File name you want to save as in S3
		Body: fileContent,
	};
	// Uploading files to the bucket
	s3.upload(params, function (err, data) {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

// @route   POST /api/images/save
// @desc    Save images test route
// @access  Private
// router.post("/save", auth, (req, res) => {
router.post("/save", (req, res) => {
	const newFileName = req.body.captureInfo.captureName;
	// save image to root of the application
	fs.writeFile(newFileName, req.body.imageData, { encoding: "base64" }, function (err, fileData) {
		// Upload file to bucket
		uploadFile(newFileName, newFileName);
		// set lastCapture to true so the image shows on capture page
		User.findOneAndUpdate({_id: req.body.captureInfo.id}, {lastCapture: true}).then(result => {
			console.log('set user lastcapture = true')
		})
	});
});

/////////////////////
// OCR
const BASE_URL = "http://www.ocrwebservice.com/restservices/processDocument";
const ARGS = "?language=english&gettext=true";
const OCR_AUTH = process.env.OCR_AUTH || config.get("OCR_AUTH");

// @route   POST /api/images/ocr
// @desc    Post images to api for OCR
// @access  Private
// router.post("/ocr", auth, (req, res) => {
router.post("/ocr", (req, res) => {
	// feed it a high quality pdf for testing
	//const fileContent = fs.readFileSync("cake.pdf");
	// Get capture from imagecapture page
	const fileContent = fs.readFileSync(req.body.captureName);
	// ocr
	axios({
		method: "post",
		url: BASE_URL + ARGS,
		data: fileContent,
		headers: {
			Authorization: OCR_AUTH,
		},
	})
		.then((result) => {
			console.log("ocr happened: ");
			console.log(result.data.OCRText);
			res.json(result.data);
			//res.json(result.response.status);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

module.exports = router;
