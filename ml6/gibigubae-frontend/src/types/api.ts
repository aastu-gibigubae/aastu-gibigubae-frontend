export interface PagedResult<T> {
  items: T[];
  total: number;
  totalPages: number;
}
