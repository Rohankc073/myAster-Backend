const AppointmentEmail = ({ userName, doctorName, date, time }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - myAster</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #2A5593; /* Primary myAster color */
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .email-header img {
      max-width: 150px;
    }
    .email-body {
      padding: 20px;
    }
    .email-body h1 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #2A5593;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
    }
    .appointment-details {
      background: #f4f4f9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .cta-button {
      display: block;
      width: 200px;
      text-align: center;
      background-color: #2A5593;
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      padding: 12px;
      border-radius: 5px;
      margin: 20px auto;
    }
    .email-footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://drive.google.com/uc?id=1kMW_TVwMnorRllJKUvCwviDJiwfYtJfu" alt="myAster Logo" width="150">
      <h1>Appointment Confirmed</h1>
    </div>
    <div class="email-body">
      <h1>Dear ${userName},</h1>
      <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been successfully scheduled.</p>

      <div class="appointment-details">
        <p><strong>📅 Date:</strong> ${date}</p>
        <p><strong>⏰ Time:</strong> ${time}</p>
        <p><strong>👨‍⚕️ Doctor:</strong> ${doctorName}</p>
      </div>

      <p>Thank you for choosing myAster for your healthcare needs. If you have any questions, feel free to contact us.</p>
      <a href="https://myaster.com/dashboard" class="cta-button">View Appointment</a>
    </div>
    <div class="email-footer">
      <p>&copy; ${new Date().getFullYear()} myAster-HMS+E-Pharmacy. All rights reserved.</p>
      <p>Need help? Contact us at support@myaster.com</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = AppointmentEmail;
