import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	category: String,
	description: String,
	image: String,
	price: Number,
	title: String,
});

export default mongoose.model("product", productSchema);
