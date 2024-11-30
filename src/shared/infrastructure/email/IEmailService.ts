export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export interface IEmailService {
    sendEmail(options: EmailOptions): Promise<void>;
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
}