import {DEFAULT_PAGE, DEFAULT_SIZE} from '@constants/paging';
import { OrderByCondition } from 'typeorm';

export const formatPaging = (page: string | number = DEFAULT_PAGE, size: string | number = DEFAULT_SIZE, sort?: string) => {
  const _page = parseInt(page as string)
  const _size = parseInt(size as string)
  
  let query = {
    take: _size,
    skip: _size * (_page -1),
    sort: {
      id: 'DESC'
    } as OrderByCondition
  }

  const _sort = sort?.split(',')
  if(_sort && _sort.length > 1) query.sort = {[_sort[0]]: _sort[1].toUpperCase()} as OrderByCondition

  return {
    pagable: {
      page: _page,
      size: _size,
    },
    query
  }
}
