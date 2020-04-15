const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../config/middleware/auth");
const fs = require("fs");

//////////////////////
// AWS
const AWS = require("aws-sdk");
// Heroku:
/* const BUCKET = process.env.BUCKET;
const ID = process.env.ID;
const SECRET = process.env.SECRET; */

const BUCKET = process.env.BUCKET || "chow-babe/publicprefix";
const ID = process.env.ID || "AKIAI5SLWFTPYW5Q2NEQ";
const SECRET = process.env.SECRET || "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";

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
		console.log("server api images save");
		console.log(req.body.id)
		// save image to root of the application with the given filename
		const filename = req.body.id + "_image.png";
		fs.writeFile(filename, req.body.imageData, { encoding: "base64" }, function (err, imageFile) {
			// Upload file to bucket
			uploadFile(filename, req.body.id + "_image.png");
		});
	});

/////////////////////
// OCR
const BASE_URL = "http://www.ocrwebservice.com/restservices/processDocument";
const ARGS = "?language=english&gettext=true";
const OCR_AUTH = process.env.OCR_AUTH;


// @route   POST /api/images/ocr
// @desc    Post images to api for OCR
// @access  Private
 //router.post("/ocr", auth, (req, res) => {
router.post("/ocr", (req, res) => {
	// feed it a high quality pdf for testing
	const fileContent = fs.readFileSync("cake.pdf");

	// ocr
	axios({
		method: "post",
		url: BASE_URL + ARGS,
		data: fileContent,
		headers: {
			Authorization: OCR_AUTH
		},
	})
		.then((result) => {
			console.log("ocr happened: ");
			console.log(result.data.OCRText);
			res.json(result.data.OCRText);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

module.exports = router;
