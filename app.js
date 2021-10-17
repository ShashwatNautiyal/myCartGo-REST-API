import express from "express";
import mongoose from "mongoose";
import product from "./dbSchema.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
const connection_url =
	"mongodb+srv://admin:admin@cluster0.jiojm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connection_url, { useNewUrlParser: true }, () => {
	console.log("connected to DB!");
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).send("Prodcuts API");
});

app.post("/products", (req, res) => {
	const productReq = req.body;

	product.create(productReq, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/products", (req, res) => {
	product.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.get("/products/:id", (req, res) => {
	product.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.delete("/products/:id", (req, res) => {
	product.remove({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
