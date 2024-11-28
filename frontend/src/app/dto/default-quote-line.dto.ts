import { DefaultQuoteLine } from "../class/default-quote-line";
import { PaginatedResponse } from "../class/pagniated-response";
import { QuoteLine } from "../class/quote-line";

export interface DefaultQuoteLineDto {
    id: number;
    description: string;
    unitPrice: number;
}

export const defaultQuoteLineDtoToQuoteLine = (dto: DefaultQuoteLineDto): DefaultQuoteLine => {
    const quoteLine = new QuoteLine();
    quoteLine.id = dto.id;
    quoteLine.description = dto.description;
    quoteLine.price = dto.unitPrice;
    return quoteLine;
}

export const defaultQuoteLinesDtoToQuoteLines = (dtos: DefaultQuoteLineDto[]): DefaultQuoteLine[] => {
    return dtos.map(defaultQuoteLineDtoToQuoteLine);
}

export const defaultQuoteLinesDtoToQuoteLinesWithPagination = (dtos: PaginatedResponse<DefaultQuoteLineDto>): PaginatedResponse<DefaultQuoteLine> => {
    return {
        ...dtos,
        data: defaultQuoteLinesDtoToQuoteLines(dtos.data)
    }
}
    