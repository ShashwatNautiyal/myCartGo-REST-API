const express = require("express");
const verifyUser = require("../middleware/verifyUser.js");
const cart = require("../models/cartSchema.js");
const cors = require("cors");

const router = express.Router();

router.get("/:id", verifyUser, (req, res) => {
	cart.find({ user: req.params.id })
		.populate("product")
		.exec((err, data) => {
			if (err) {
				res.status(500).send(err);
			} else {
				let order = returnOrder(data);
				res.status(200).send(order);
			}
		});
});

router.post("/", verifyUser, (req, res) => {
	const newOrder = {
		product: req.body.productId,
		quantity: req.body.quantity ? parseInt(req.body.quantity) : 1,
		user: req.body.userId,
	};

	cart.create(newOrder, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.delete("/:id", verifyUser, (req, res) => {
	cart.remove({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

function returnOrder(data) {
	if (data.length > 0) {
		return data.map((item) => {
			return {
				title: item.product.title,
				description: item.product.description,
				price: item.product.price,
				quantity: item.quantity,
				total: item.product.price * item.quantity,
				image: item.product.image,
				_id: item._id,
			};
		});
	} else {
		return;
	}
}

module.exports = router;
