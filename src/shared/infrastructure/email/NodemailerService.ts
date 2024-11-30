import nodemailer from 'nodemailer';
import { injectable } from 'tsyringe';
import { IEmailService, EmailOptions } from './IEmailService';
import { EmailError } from '@/shared/errors/EmailError';

@injectable()
export class NodemailerService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        // Required for Mailgun
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP connection successful');
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        ...options
      };
      console.log('Email configuration:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
          user: process.env.SMTP_USER
        }
      });
      console.log('Sending email to:', options.to);
      
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result);
    } catch (error: any) {
      // Log the full error object
      console.error('Email error details:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
        stack: error.stack
      });
      throw new EmailError(`Failed to send email: ${error.message}`, error);
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
    await this.sendEmail({
      to: email,
      subject: 'Verify your email',
      html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    await this.sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `Please click <a href="${resetUrl}">here</a> to reset your password.`
    });
  }
}