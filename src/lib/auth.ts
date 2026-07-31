import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
// If your Prisma file is located elsewhere, you can change the path

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Prima Blog" <mdtahmidalam122@gmail.com>',
          to: user.email,
          subject: "Verify your email address",
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;">
          
          <tr>
            <td align="center">
              <h1 style="margin:0;color:#111827;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;color:#4b5563;font-size:16px;line-height:1.6;">
              Hi <strong>${user.name}</strong>,
            </td>
          </tr>

          <tr>
            <td style="padding-top:16px;color:#4b5563;font-size:16px;line-height:1.6;">
              Thanks for creating your account. Please verify your email address by clicking the button below.
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:35px 0;">
              <a
                href="${verificationUrl}"
                style="
                  background:#2563eb;
                  color:#ffffff;
                  text-decoration:none;
                  padding:14px 32px;
                  border-radius:8px;
                  display:inline-block;
                  font-size:16px;
                  font-weight:bold;
                "
              >
                Verify Email
              </a>
            </td>
          </tr>

          <tr>
            <td style="color:#6b7280;font-size:14px;line-height:1.6;">
              If the button doesn't work, copy and paste the following link into your browser:
            </td>
          </tr>

          <tr>
            <td style="padding-top:10px;">
              <a
                href="${verificationUrl}"
                style="word-break:break-all;color:#2563eb;font-size:14px;"
              >
                ${verificationUrl}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;color:#6b7280;font-size:14px;line-height:1.6;">
              If you didn't create an account, you can safely ignore this email.
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:13px;text-align:center;">
              © ${new Date().getFullYear()} Example Team. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
        });

        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error("Error while sending mail:", err);
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
