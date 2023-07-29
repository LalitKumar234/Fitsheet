import { NextResponse } from "next/server";
import product from "@/models/product";
import connectDB from "@/middleware/db";

export async function GET(req, res) {

    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams.get("id");

        await connectDB();

        const prodInfo = await product.findById(searchParams);
        return NextResponse.json(prodInfo, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Internal server error.." }, { status: 500 });
    }
}