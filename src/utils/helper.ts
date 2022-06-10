import {Request} from 'express';
import {extname} from 'path';
import {promisify} from 'util';
import {unlink} from 'fs';
import {Pageable} from './commonDto';
import {formatPaging} from './formatter';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export const createQueryBuilder = (
  repository,
  alias: string,
  {pageable, relations}: {pageable: Pageable; relations: string[]},
) => {
  const {page, size, sort} = pageable;
  const paging = formatPaging(page, size, sort);
  const query = repository
    .createQueryBuilder(alias)
    .take(paging.query.take)
    .skip(paging.query.skip);

  const _order: any = {};
  Object.keys(paging.query.sort).forEach((e) => {
    _order[`${alias}.${e}`] = paging.query.sort[e];
  });
  query.orderBy(_order);

  relations.forEach((relation) => {
    query.leftJoinAndSelect(`${alias}.${relation}`, relation);
  });

  return query;
};

export const imageFileFilter = (_req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (_req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${uuidv4()}${fileExtName}`);
};
