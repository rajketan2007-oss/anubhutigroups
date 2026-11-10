import nodemailer from 'nodemailer';

export const sendEnquiryNotification = async (enquiry) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`ℹ️ [Email Simulation] New ${enquiry.division} Enquiry from ${enquiry.fullName} (${enquiry.phone}, ${enquiry.email}): "${enquiry.message.slice(0, 50)}..."`);
      return { success: true, simulated: true };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Anubhuti Group Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || 'info@anubhutigroup.com',
      subject: `[New Inquiry] ${enquiry.division} - ${enquiry.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E3DDD4; border-radius: 8px;">
          <h2 style="color: #1F3D36; border-bottom: 2px solid #B8935A; padding-bottom: 8px;">New Priority Consultation Request</h2>
          <p><strong>Division:</strong> ${enquiry.division}</p>
          <p><strong>Full Name:</strong> ${enquiry.fullName}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Project Type:</strong> ${enquiry.projectType || 'N/A'}</p>
          <p><strong>Budget:</strong> ${enquiry.budget || 'Flexible'}</p>
          <p><strong>Inquiry Message:</strong></p>
          <blockquote style="background: #FAF7F2; padding: 12px; border-left: 4px solid #B8935A;">${enquiry.message}</blockquote>
          <p style="font-size: 12px; color: #66706B;">Sent automatically from Anubhuti Group Web Portal.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Notification email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('⚠️ Email notification error:', error.message);
    return { success: false, error: error.message };
  }
};

