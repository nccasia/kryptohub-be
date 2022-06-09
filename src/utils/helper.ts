import {extname} from 'path';
import {Request} from 'express';
import {promisify} from 'util';
import {unlink} from 'fs';
import {Pageable} from './commonDto';
import {formatPaging} from './formatter';

const unlinkAsync = promisify(unlink);
export class HelperFile {
  static customFilename(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const nameFile = cb(null, `${randomName}${extname(file.originalname)}`);

    return nameFile;
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (err) {
      throw new Error('Arquivo não encontrado');
    }
    return true;
  }
}

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
