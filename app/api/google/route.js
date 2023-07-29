import { NextResponse } from "next/server";
import User from "@/models/user";
import connectDB from "@/middleware/db";

export async function POST(req, res) {

    const body = await req.json();
    const { _id, name, email } = body.user;

    try {
        await connectDB();

        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(user, { status: 200 });
        }

        user = await User.create({
            _id,
            name,
            email,
        });
        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}