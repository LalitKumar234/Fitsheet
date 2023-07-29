import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [9, "Product price cannot exceed 5 characters"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    likes: {
        type: Number,
        default: 0
    },
    images: [],
    category: {
        type: String,
        required: [true, "Please select category for this product"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
            ],
            message: "Please select correct category for product",
        },
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0
    },
    size: [
        {
            type: String,
            required: [true, "Please enter product size"],
            enum: {
                values: [
                    "S",
                    "M",
                    "L",
                ],
                message: "Please select correct size for product",
            },
        }
    ],
    video: {
        type: String,
    },
    seo: {
        title: {
            type: String,
            required: [true, "Please enter product seo title"],
            maxLength: [100, "Product seo title cannot exceed 100 characters"]
        },
        slug: {
            type: String,
            required: [true, "Please enter product seo slug"],
            maxLength: [100, "Product seo slug cannot exceed 100 characters"]
        },
        description: {
            type: String,
            required: [true, "Please enter product seo description"],
            maxLength: [200, "Product seo description cannot exceed 200 characters"]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

mongoose.models = {};
export default mongoose.model("Product", productSchema);
