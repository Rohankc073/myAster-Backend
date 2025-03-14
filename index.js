const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
}));

app.use(express.json()); // Parse JSON requests

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Import & Use Routes
app.use("/user", require('./router/userRouter'));
app.use('/auth', require('./router/authRouter'));
app.use('/products', require('./router/productRouter'));
app.use('/patient', require('./router/patientRouter'));
app.use('/doctors', require('./router/doctorRouter'));
app.use('/appointments', require('./router/appointmentRouter'));
app.use('/cart', require('./router/cartRouter'));
app.use('/order', require('./router/orderRouter'));
app.use('/review', require('./router/reviewRouter'));
app.use('/services', require('./router/serviceRouter'));
app.use('/packages', require('./router/packageRouter'));
app.use('/booking', require('./router/service_bookingRouter'));

// Start the server only when not in test mode
const PORT = 5003;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server started at port ${PORT}`);
    });
}

// Export app for testing
module.exports = app;
