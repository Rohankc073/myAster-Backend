const express = require("express");
const app = express();
const userRoutes= require('./router/userRouter')
const connectDB = require("./config/db");
const productRoutes = require("./router/productRouter")
const authRoutes = require('./router/authRouter');
const patientRoutes = require('./router/patientRouter')
const appointmentRouter = require('./router/appointmentRouter');
const doctorRouter = require('./router/doctorRouter');
connectDB();

app.use(express.json())
app.use("/user",userRoutes)
app.use('/', authRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/products', productRoutes);
app.use('/patient',patientRoutes);
app.use('/doctors', doctorRouter);
app.use('/appointments', appointmentRouter);
app.use(express.json());



// Start the server
const PORT = 5003;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


