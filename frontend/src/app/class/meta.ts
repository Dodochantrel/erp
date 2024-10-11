export class Meta {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    pageCount: number;
    page: number;
    limit: number;
  
    constructor(
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemCount: number,
      pageCount: number,
      page: number,
      limit: number
    ) {
      this.hasNextPage = hasNextPage;
      this.hasPreviousPage = hasPreviousPage;
      this.itemCount = itemCount;
      this.pageCount = pageCount;
      this.page = page;
      this.limit = limit;
    }
  }
  