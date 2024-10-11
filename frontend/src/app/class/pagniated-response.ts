import { Meta } from "./meta";

export class PaginatedResponse<T> {
  data: T[];
  meta: Meta;

  constructor(
    data: T[],
    meta: Meta
  ) {
    this.data = data;
    this.meta = meta;
  }
}
