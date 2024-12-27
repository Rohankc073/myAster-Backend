const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceBookingSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true }, // Reference to Patient model
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true }, // Reference to Service model
    date: { type: Date, required: true }, // Date of the service booking
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const ServiceBooking = mongoose.model("ServiceBooking", ServiceBookingSchema);

module.exports = ServiceBooking;
