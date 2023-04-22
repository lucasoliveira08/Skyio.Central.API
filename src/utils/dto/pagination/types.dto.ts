export type Sort = {
  field: string;
  by: 'ASC' | 'DESC';
};

export type PagedResult<T> = {
  CurrentPage: number;
  PageCount: number;
  PageSize: number;
  RowCount: number;
  FirstRowOnPage: number;
  LastRowOnPage: number;
  Elements: T[];
};
