import { Company } from "./company";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    isValidate: boolean;
    lastLogin: Date | null;
    company: Company | null;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = null;
        this.password = null;
        this.role = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isValidate = false;
        this.lastLogin = null;
        this.company = null;
    }
}

export interface RegisterInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface ForgotPasswordInterface {
    email: string;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}