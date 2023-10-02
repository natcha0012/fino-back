export type GetFundsReq = {
  startDate?: string;
  endDate?: string;
  pagination: {
    page: number;
    rowPerPage: number;
  };
};
