const express = require("express");
const product = require("../models/productSchema.js");

const router = express.Router();

router.post("/", (req, res) => {
	const productReq = req.body;

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
