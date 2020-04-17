import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import CaptureImg from "../CaptureImg/CaptureImg";
import API from "../../Utils/api";

class WebcamCapture extends React.Component {
	constructor() {
		super();
		// set name of capture file for upload
		this.state = {
			id: "",
			captureName: "",
			lastCapture: false,
			ocrResults: [],
		};
	}

	getUserId = () => {
		API.getUserId().then((result) => {
			this.setState({
				id: result.data._id,
				lastCapture: result.data.lastCapture,
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
			lastCapture: true
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

		const divStyle = {
			padding: 0,
			marginTop: 80,
			marginBottom: 20,
		};

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="webcamContainer" style={divStyle}>
					<Webcam
						className="webcam"
						audio={false}
						ref={this.setRef}
						width={350}
						screenshotFormat="image/png"
						videoConstraints={videoConstraints}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={this.capture}
					>
						Capture Photo!
					</Button>
					{this.state.lastCapture ? 
						(<div>
							<CaptureImg
							key={this.state.key}
							captureName={this.state.captureName}
							ocr={this.ocr}
						/>
							<div className="resultsContainer">
								{this.state.ocrResults}
							</div>
						</div>)
					: null}
				</div>
			</Container>
		);
	}
}

export default WebcamCapture;
