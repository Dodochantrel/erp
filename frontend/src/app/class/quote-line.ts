export class QuoteLine {
    id: number;
    description: string;
    quantity: number;
    price: number;

    constructor() {
        this.id = 0;
        this.description = '';
        this.quantity = 0;
        this.price = 0;
    }
}