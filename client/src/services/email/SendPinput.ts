import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || "");
const TO_EMAIL = process.env.NEXT_PUBLIC_TO_EMAIL ?? 'default@gmail.com';
const FROM_EMAIL = process.env.NEXT_PUBLIC_FROM_EMAIL ?? 'default@gmail.com';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, message } = req.body;

    const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: 'Mail from ' + email,
        text: message,
        html: message,
    };

    try {
        await sgMail.send(msg);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
    }
}