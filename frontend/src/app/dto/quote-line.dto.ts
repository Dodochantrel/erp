import { QuoteLine } from "../class/quote-line";

export interface QuoteLineDto {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
}

export const QuoteLineDtoToQuoteLine = (dto: QuoteLineDto): QuoteLine => {
    const quoteLine = new QuoteLine();
    quoteLine.id = dto.id;
    quoteLine.description = dto.description;
    quoteLine.quantity = dto.quantity;
    quoteLine.unitPrice = dto.unitPrice;
    return quoteLine;
}