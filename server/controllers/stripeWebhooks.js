import Stripe from "stripe";
import Booking from "../models/Booking.js";

// api to handle stripe webhooks

export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers['stripe-signature']
    let event
    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object
        const paymentIntentId = paymentIntent.id

        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        })
        const { bookingId } = session.data[0].metadata

        // mark payment as paid
        await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "Stripe" })
    }
    else {
        console.log("Unhandled Event type: ", event.type)
    }
    response.json({ received: true })
}