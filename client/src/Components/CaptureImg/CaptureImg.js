import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import API from "../../Utils/api";

export default function CaptureImage(props) {
	const divStyle = {
		padding: 0,
		marginTop: 20,
		marginBottom: 20,
	};

	return (
		<div className="captureContainer">
			<img
				style={divStyle}
				id={props.key}
				className="capture"
				src={"https://chow-babe.s3.amazonaws.com/publicprefix/" + props.captureName}
				alt="Test"
			></img>
			<Button type="submit" variant="contained" color="primary" onClick={props.ocr}>
				Scan Image
			</Button>
		</div>
	);
}
