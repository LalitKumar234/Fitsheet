import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "product",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        paymentIntent: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "Awaiting Payment",
            enum: ["Awaiting Payment", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded", "Failed", "Completed"],
        },
        orderDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        shippingAddress: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {
        timestamps: true,
    }
);

const order = mongoose.model("order", orderSchema);