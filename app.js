const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const productsRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");

const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_CONNECTION_URL;

mongoose.connect(connection_url, { useNewUrlParser: true }, () => {
	console.log("connected to DB!");
});

app.use(express.json());

app.use(
	cors({
		origin: "*",
	})
);

app.use("/products", productsRoute);
app.use("/user", authRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
	res.status(200).send("Prodcuts API");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
