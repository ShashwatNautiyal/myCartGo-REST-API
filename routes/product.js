const express = require("express");
const product = require("../models/productSchema.js");
const { upload } = require("../utils/upload.js");

const router = express.Router();

router.post("/", upload.array("images", 5), (req, res) => {
	let productReq = req.body;
	const image = req.files[0].location;

	productReq["image"] = image;

	product.create(productReq, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.get("/", (req, res) => {
	product.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.get("/:id", (req, res) => {
	product.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.delete("/:id", (req, res) => {
	product.remove({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

module.exports = router;
