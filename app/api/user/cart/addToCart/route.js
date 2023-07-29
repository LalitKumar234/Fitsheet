import { NextResponse } from "next/server";
import user from "@/models/user";
import connectDB from '@/middleware/db';

export async function POST(req, res) {

    try {
        await connectDB();

        const body = await req.json();
        const { userId, productId } = body;

        const userFound = await user.findOneAndUpdate(
            { _id: userId }, // Only update if the product ID doesn't exist in the cart
            { $addToSet: { cart: productId } }, // Add the new product ID to the cart array
            { new: true }
        );

        if (!userFound) {
            // Handle error
            return NextResponse.json({ msg: "Errors" }, { status: 301 });
        }

        return NextResponse.json({ message: "Product added to cart." });

    } catch (error) {
        console.log("hello: " + error);
        return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }
}