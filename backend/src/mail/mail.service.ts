import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppError } from '../error/app-error.exception';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private appName: string = process.env.SMTP_EMAIL;
  logger = new Logger('MailService');

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html,
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new AppError("Erreur lors de l'envoi de l'email", 500);
    }
  }

  async registerEmail(to: string, token: string) {
    const subject = `Bienvenue chez ${this.appName}`;
    const html = `<p>Bonjour,</p>
    <p>Merci de vous être inscrit chez ${this.appName}</p>
    <p>Pour valider votre inscription, veuillez cliquer sur le lien suivant:</p>
    <p><a href="${process.env.FRONTEND_URL}/auth/validate/${token}">${process.env.FRONTEND_URL}/auth/validate/${token}</a></p>`;
    return await this.sendEmail(to, subject, html);
  }

  async forgotPasswordEmail(to: string, token: string) {
    const subject = 'Changement de mot de passe';
    const html = `<p>Bonjour,</p>
    <p>Vous avez demandé un changement de mot de passe.</p>
    <p>Pour changer votre mot de passe, veuillez cliquer sur le lien suivant:</p>
    <p><a href="${process.env.FRONTEND_URL}/auth/resetPassword/${token}">${process.env.FRONTEND_URL}/auth/resetPassword/${token}</a></p>`;
    return await this.sendEmail(to, subject, html);
  }

  async resetPasswordEmail(to: string) {
    const subject = 'Mot de passe modifié';
    const html = `<p>Bonjour,</p>
    <p>Votre mot de passe a bien été modifié.</p>`;
    return await this.sendEmail(to, subject, html);
  }
}
