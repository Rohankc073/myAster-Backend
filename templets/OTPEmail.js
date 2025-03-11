module.exports = ({ otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #007bff;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Use the following OTP to proceed:</p>
        <div style="background: #f8f9fa; padding: 10px; font-size: 18px; font-weight: bold; text-align: center; width: 150px; margin: 10px auto;">
            ${otp}
        </div>
        <p><strong>Note:</strong> This OTP is valid for <span style="color: red;">1 hour</span>. If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Support Team</p>
    </div>
    `;
};
