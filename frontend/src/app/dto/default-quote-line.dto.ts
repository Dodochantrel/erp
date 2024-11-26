import { DefaultQuoteLine } from "../class/default-quote-line";
import { QuoteLine } from "../class/quote-line";

export interface DefaultQuoteLineDto {
    id: number;
    description: string;
    price: number;
}

export const defaultQuoteLineDtoToQuoteLine = (dto: DefaultQuoteLineDto): DefaultQuoteLine => {
    const quoteLine = new QuoteLine();
    quoteLine.id = dto.id;
    quoteLine.description = dto.description;
    quoteLine.price = dto.price;
    return quoteLine;
}

export const defaultQuoteLinesDtoToQuoteLines = (dtos: DefaultQuoteLineDto[]): DefaultQuoteLine[] => {
    return dtos.map(defaultQuoteLineDtoToQuoteLine);
}
    