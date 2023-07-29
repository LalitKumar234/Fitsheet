import { NextResponse } from "next/server";
import product from "@/models/product";
import connectDB from "@/middleware/db";
import { headers } from "next/headers";

export async function GET(req, res) {

    try {

        const headersList = headers();
        const token = headersList.get('token');

        if(!token || token !== process.env.LOCAL_API_REQUEST_TOKEN) {
            return NextResponse.json({ msg: "Bad request" }, { status: 400 });
        }

        await connectDB();

        const products = await product.find();
        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Internal server error.." }, { status: 500 });
    }
}