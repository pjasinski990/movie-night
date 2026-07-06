import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class EmailService {
    private static instance: EmailService | null = null;
    private readonly transporter: Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST!,
            port: Number(process.env.SMTP_PORT!),
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!,
            },
        });
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async sendEmail(to: string, subject: string, text: string, html: string, attachments?: Mail.Attachment[]): Promise<void> {
        const msg = {
            to,
            from: process.env.EMAIL_FROM!,
            subject,
            text,
            html,
            attachments,
        };

        try {
            await this.transporter.sendMail(msg);
            console.log(`Email sent to ${msg.to}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
