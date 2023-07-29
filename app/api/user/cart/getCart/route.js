import { NextResponse } from "next/server";
import user from "@/models/user";
import connectDB from '@/middleware/db';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req, res) {

    const session = await getServerSession(authOptions);

    try {
        await connectDB();

        const userId = session.user.id;
        window("User ID: ", userId);

        const userFound = await user.findOne({_id: userId}).populate('cart');
        if (!userFound) {
            // Handle error
            return NextResponse.json({ msg: "Errors" }, { status: 301 });
        }
        return NextResponse.json(userFound.cart, { status: 200 });

    } catch (error) {
        console.log("Error in get cart: ", error);
        return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }
}