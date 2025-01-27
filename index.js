const express = require("express");
const app = express();
const userRoutes= require('./router/userRouter')
const connectDB = require("./config/db");
const productRoutes = require("./router/productRouter")
const authRoutes = require('./router/authRouter');
const patientRoutes = require('./router/patientRouter')
const appointmentRouter = require('./router/appointmentRouter');
const doctorRouter = require('./router/doctorRouter');
const cartRoutes = require('./router/cartRouter');
const reviewRoutes = require('./router/reviewRouter');
const orderRoutes = require('./router/orderRouter');
const serviceRouter = require('./router/serviceRouter');
const cors = require("cors");
const serviceBookingRouter = require('./router/service_bookingRouter')
connectDB();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Allow your frontend to access this server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
}));

app.use(express.json())
app.use("/user",userRoutes)
app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/products', productRoutes);
app.use('/patient',patientRoutes);
app.use('/doctors', doctorRouter);
app.use('/appointments', appointmentRouter);
app.use('/cart',cartRoutes);
app.use("/order",orderRoutes)
app.use('/review',reviewRoutes)
app.use('/services',serviceRouter)
app.use('/booking',serviceBookingRouter)
app.use(express.json());

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


