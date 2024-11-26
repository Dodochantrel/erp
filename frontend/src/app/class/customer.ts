export class Customer {
    id: number;
    isCompany: boolean;
    siret: string | null;
    companyName: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;

    constructor(id: number, isCompany: boolean) {
        this.id = id;
        this.isCompany = isCompany;
        this.siret = null;
        this.companyName = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.phoneNumber = null;
        this.address = null;
        this.city = null;
        this.zipCode = null;
        this.country = null;
    }

    prepareName(): string {
        return this.isCompany ? this.companyName! : `${this.lastName!.toUpperCase()} ${this.firstName}`;
    }
}
