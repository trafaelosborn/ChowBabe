import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Drawer from "../Drawer/Drawer";
import API from "../../Utils/api";

export default function Profile() {
	const [user, setUser] = useState({});
	const { id } = useParams();

	useEffect(() => {
		API.getUserInfo(id)
			.then(user => {
				setUser(user.data);
			})
			.catch(err => console.log(err));
	}, []);

	const handleInput = e => {
		console.log("handle input");
	};

	return (
		<div>
			<Navbar />
			<Drawer user={user} />
		</div>
	);
}
