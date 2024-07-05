type PaginationValues = {
  count?: number;
  limit?: number;
  offset?: number;
};

type PaginationUtilsType = {
  _count: number;
  _limit: number;
  _offset: number;
  set setValues(values: PaginationValues);
  readonly totalPages: number;
  readonly pageRange: number;
  readonly currentPage: number;
};
const paginationUtils: PaginationUtilsType = {
  _count: 0,
  _limit: 10,
  _offset: 0,

  set setValues({ count, limit, offset }: PaginationValues) {
    count !== undefined && (this._count = count);
    limit !== undefined && (this._limit = limit);
    offset !== undefined && (this._offset = offset);
  },

  get totalPages() {
    return Math.ceil(this._count / this._limit);
  },

  get pageRange() {
    return this.totalPages < 7 ? this.totalPages : 7;
  },

  get currentPage() {
    return Math.floor(this._offset / this._limit) + 1;
  },
};

export default paginationUtils;
