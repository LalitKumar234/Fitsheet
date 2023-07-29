import { NextResponse } from "next/server";
import user from "@/models/user";
import connectDB from '@/middleware/db';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function POST(req, res) {
    const session = await getServerSession(authOptions);

    try {
        await connectDB();

        const body = await req.json();
        const { prodId } = body;
        const userId = session.user.id;

        let userFound = await user.findOneAndUpdate(
            { _id: userId },
            { $pull: { cart: prodId } }, // Remove the product ID from the cart array
            { new: true }
        );

        userFound = await user.findOne({ _id: userId }).populate('cart');
        if (!userFound) {
            // Handle error
            return NextResponse.json({ msg: "Errors" }, { status: 301 });
        }

        return NextResponse.json(userFound.cart, { status: 200 });

    } catch (error) {
        console.log("hello: " + error);
        return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }
}