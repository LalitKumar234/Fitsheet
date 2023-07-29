import { NextResponse } from "next/server";
import connectDB from "@/middleware/db";
import User from "@/models/user";
import OTP from "@/models/otp";

export async function POST(req, res) {
    const body = await req.json();
    const { otp, phone } = body;

    try {
        await connectDB();

        let user = await User.findOne({ phone });
        if (!user) {
            return NextResponse.json({ msg: "no user found" }, { status: 404 });
        }

        const otpDoc = await OTP.findOne({ mobile: phone });
        if (!otpDoc || otpDoc.otp !== otp) {
            return NextResponse.json({ msg: "otp not matched" }, { status: 400 });
        }

        await OTP.deleteOne({ mobile: phone });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}