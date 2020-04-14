const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();

const port = process.env.PORT || 3001;

// Body Parser middleware
app.use(express.json({ limit: "5mb" }));

// DB config
//const db = config.get("mongoURI");
const db =
	"mongodb://heroku_0qbv22pw:qot9i18ia71featoo1lng43g5q@ds159328.mlab.com:59328/heroku_0qbv22pw";
// connect to DB
mongoose
	.connect(process.env.MONGODB_URI || db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("mongodb connected"))
	.catch((err) => console.log(err));

// use routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/images", require("./routes/images"));

// Server static assets if we're in production
if (process.env.NODE_ENV === "production") {
	// Exprees will serve up production assets
	app.use(express.static("client/build"));

	// Express serve up index.html file if it doesn't recognize route
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => console.log(`Server started on port ${port}`));
