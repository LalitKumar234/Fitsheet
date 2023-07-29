import { NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


export async function POST(req, res) {
    try {
        const body = await req.json();
        if (!body.oid || !body.subTotal) {
            return NextResponse.error(new Error('Invalid Request'));
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Test Product',
                        },
                        unit_amount: body.subTotal * 100,
                    },
                    quantity: body.quantity,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/checkout/cancel',
        });

        return NextResponse.json({ session }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    }
}