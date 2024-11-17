import sgMail from '@sendgrid/mail';
import Attachment from "@sendgrid/helpers/classes/attachment"


export class EmailService {
    private static instance: EmailService | null = null;

    private constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async sendEmail(to: string, subject: string, text: string, html: string, attachments?: Attachment[]): Promise<void> {
        const msg = {
            to,
            from: process.env.EMAIL_FROM!,
            subject,
            text,
            html,
            attachments,
        };

        try {
            await sgMail.send(msg);
            console.log(`Email sent to ${msg.to}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
