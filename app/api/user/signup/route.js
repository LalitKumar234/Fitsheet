import { NextResponse } from "next/server";
import User from "@/models/user";
import OTP from "@/models/otp";
import connectDB from "@/middleware/db";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtp = async (phone, otp) => {
    try {
        client.messages
            .create({
                body: `Your Fitsheet verification code is - ${otp}`,
                from: '+15735334975', // From a valid Twilio number
                to: `+91${phone}`, // Text this number
            });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req, res) {

    const body = await req.json();
    const { phone, name, email } = body;

    try {
        await connectDB();

        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({
                phone,
                name,
                email,
            });
        }

        let otpData = await OTP.findOne({ mobile: phone });
        if (!otpData) {

            const otp = Math.floor(100000 + Math.random() * 900000);

            otpData = await OTP.create({
                mobile: phone,
                otp,
            });
        }
        await sendOtp(phone, otpData.otp);

        if (otpData) {
            return NextResponse.json({ msg: "Otp sent" }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}