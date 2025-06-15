import express, { application } from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoute.js"
import connectCloudinary from "./configs/cloudinary.js"
import roomRouter from "./routes/roomRoute.js"
import bookingRouter from "./routes/bookingRoutes.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"


connectDB()
connectCloudinary()

const app = express()
// app.use(cors()) //Enable Cross-Origin Sharing
app.use(cors({
    origin: 'https://final-elite-stay-kqv7.vercel.app',
    credentials: true
}));
// API to listen to Stripe Webhooks
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebhooks)

// Middleware
app.use(express.json())
app.use(clerkMiddleware())


// API to listen clerk webhook
app.use("/api/clerk", clerkWebhooks)


app.get('/', (req, res) => res.send("API is Working Fine"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//5 13 21