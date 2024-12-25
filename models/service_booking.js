const ServiceBookingSchema = new Schema(
    {
      patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
      serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
      date: { type: Date, required: true }, // Appointment date for the service
      status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }, // Booking status
    },
    { timestamps: true }
  );
  
  const ServiceBooking = mongoose.model('ServiceBooking', ServiceBookingSchema);
  module.exports = ServiceBooking;
  