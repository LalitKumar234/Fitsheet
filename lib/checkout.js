import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export const checkout = async () => {
    const response = await fetch('http://localhost:3000/api/stripe/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oid: '1234567890',
            subTotal: 50,
            quantity: 3,
        })
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const { session } = await response.json();

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    if (result.error) {
        console.log(result.error.message);
    }
}