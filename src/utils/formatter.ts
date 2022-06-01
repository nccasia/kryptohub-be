import { DEFAULT_PAGE, DEFAULT_SIZE } from "../constants/paging"

export const formatPaging = (page: string | number = DEFAULT_PAGE, size: string | number = DEFAULT_SIZE, sort?: string) => {
  const _page = parseInt(page as string)
  const _size = parseInt(size as string)

  let query = {
    take: _size,
    skip: _size * (_page -1)
  }

  const _sort = sort?.split(',')
  if(_sort && _sort.length > 1) query['order'] = {[_sort[0]]: _sort[1].toUpperCase()} 

  return {
    pagable: {
      page: _page,
      size: _size,
    },
    query
  }
} 