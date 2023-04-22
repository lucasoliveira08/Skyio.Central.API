import { Injectable } from '@nestjs/common';
import { PagedResult } from './types.dto';
import { PaginationDTO } from './pagination.dto';

@Injectable()
export class PaginationService {
  getPaged = async <T>(
    query: any,
    pagination: PaginationDTO,
    service: any,
  ): Promise<PagedResult<T>> => {
    const result: PagedResult<T> = {
      CurrentPage: pagination.skip,
      PageSize: pagination.take,
      FirstRowOnPage: (pagination.skip - 1) * pagination.take + 1,
      RowCount: await service.count({ where: query.where }),
      PageCount: null,
      LastRowOnPage: null,
      Elements: null,
    };

    const skip = (pagination.skip - 1) * pagination.take;
    query.skip = skip;
    query.take = pagination.take;

    result.Elements = await service.findMany(query);

    result.LastRowOnPage = Math.min(
      pagination.skip * pagination.take,
      result.RowCount,
    );

    const pageCount = result.RowCount / result.PageSize;
    result.PageCount = Math.ceil(pageCount);

    return result;
  };
}
