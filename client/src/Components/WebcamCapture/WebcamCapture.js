import React from "react";
import Webcam from "react-webcam";
import API from "../../Utils/api";

class WebcamCapture extends React.Component {
	constructor() {
		super();
		// set name of capture file for upload
		this.state = {
			id: "",
			captureName: "",
			ocrResults: [],
		};
	}

	getUserId = () => {
		API.getUserId().then((result) => {
			this.setState({
				id: result.data._id,
				captureName: result.data._id + "_image.png",
			});
		});
	};

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		const imageSrc = this.webcam.getScreenshot();
		this.setState({
			captureName: this.state.id + "_image.png",
		});
		API.saveImage(imageSrc, this.state);
	};

	// Send image to OCR api
	ocr = () => {
		API.ocr(this.state).then((ocrData) => {
			this.setState({ ocrResults: ocrData.data.OCRText });
		});
	};

	componentDidMount() {
		this.getUserId();
	}

	render() {
		const videoConstraints = {
			width: 1280,
			height: 720,
			facingMode: "user",
		};

		return (
			<div className="webcamContainer">
				<h1>Welcome user {this.state.id}</h1>
				<Webcam
					className="webcam"
					audio={false}
					height={350}
					ref={this.setRef}
					screenshotFormat="image/png"
					width={350}
					videoConstraints={videoConstraints}
				/>

				<button onClick={this.capture}>Capture photo</button>

				<div className="captureContainer">
					<h1>Filename: {this.state.captureName}</h1>
					<img
						className="capture"
						src={
							"https://chow-babe.s3-us-west-2.amazonaws.com/publicprefix/" +
							this.state.captureName
						}
						alt="Test"
					></img>
					<button onClick={this.ocr}>OCR Test</button>
				</div>

				<div className="resultsContainer">{this.state.ocrResults}</div>
			</div>
		);
	}
}

export default WebcamCapture;
