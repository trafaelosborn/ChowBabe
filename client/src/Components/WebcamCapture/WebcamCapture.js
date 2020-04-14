import React from "react";
import Webcam from "react-webcam";
import API from '../../Utils/api';

class WebcamCapture extends React.Component {
	setRef = webcam => {
	  this.webcam = webcam;
	};
  
	capture = () => {
	  const imageSrc = this.webcam.getScreenshot();
	  API.saveImage(imageSrc);
	};

	ocr = () => {
		API.ocr();
	}
  
	render() {
	  const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user"
	  };
  
	  return (
		<div>
		  <Webcam
			audio={false}
			height={350}
			ref={this.setRef}
			screenshotFormat="image/png"
			width={350}
			videoConstraints={videoConstraints}
		  />
		  <button onClick={this.capture}>Capture photo</button>
		  <button onClick={this.ocr}>OCR Test</button>
		  <img src="https://chow-babe.s3-us-west-2.amazonaws.com/publicprefix/testUpload.png" alt="Test"></img>
		</div>
	  );
	}
  }

  export default WebcamCapture;