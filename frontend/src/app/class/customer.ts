export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = null;
        this.phoneNumber = null;
        this.address = null;
        this.city = null;
        this.zipCode = null;
        this.country = null;
    }
}
