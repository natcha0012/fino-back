import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetFundsReq } from './dto/request';
import { FundResp } from './dto/response';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getFund(input: GetFundsReq) {
    const { data } = await this.httpService.axiosRef.get<{ data: FundResp[] }>(
      'https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json',
    );
    let result = data.data;
    if (input.startDate) {
      result = result.filter((r) => {
        return new Date(r.nav_date) >= new Date(input.startDate);
      });
    }
    if (input.endDate) {
      result = result.filter((r) => {
        return new Date(r.nav_date) <= new Date(input.endDate);
      });
    }
    const totalItems = result.length;
    if (input.pagination) {
      const { page, rowPerPage } = input.pagination;
      const skip = (page - 1) * rowPerPage;
      result = result.slice(skip, skip + rowPerPage);
    }

    return {
      totalItems,
      data: result.map((res) => {
        return { ...res, nav_date: new Date(res.nav_date).toDateString() };
      }),
    };
  }
}
