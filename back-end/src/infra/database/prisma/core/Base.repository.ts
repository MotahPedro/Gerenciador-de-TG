import {
  IPaginationMetadata,
  IPaginationOptions,
} from '../../../../helpers/interface/Paginate.interface';
import { PrismaRepository } from './PrismaRepository';

export class BaseRepository {
  public constructor(
    protected prisma: PrismaRepository,
    readonly entityName: string,
  ) {}

  async create(entity: any): Promise<any> {
    return await this.prisma[this.entityName].create({ ...entity });
  }

  async update(id: string | number, data: any): Promise<any> {
    return await this.prisma[this.entityName].update({
      where: { id },
      data,
    });
  }

  async updateMany(where: any, data: any): Promise<any> {
    return await this.prisma[this.entityName].updateMany({
      where,
      data,
    });
  }

  async paginate(params: {
    options: IPaginationOptions;
    where?: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any> {
    const { options, where, include, select, orderBy } = params;
    const skipCalc = (options.page - 1) * options.limit;

    const [count, result] = await Promise.all([
      this.prisma[this.entityName].count({
        where,
      }),
      this.prisma[this.entityName].findMany({
        skip: skipCalc < 0 ? 0 : skipCalc,
        take: options.limit,
        where,
        select,
        include,
        orderBy: orderBy
          ? orderBy
          : {
              createdAt: 'desc',
            },
      }),
    ]);
    const totalPages = Math.ceil(count / options.limit);

    const metadata = {
      itemCount: result.length,
      totalItems: count,
      itemsPerPage: options.limit,
      totalPages,
      currentPage: options.page == 0 ? 1 : options.page,
    } as IPaginationMetadata;

    return {
      items: result,
      meta: metadata,
    };
  }

  async findOne(params: {
    where: any;
    include?: any;
  }): Promise<any | undefined> {
    const { where, include } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findUnique({ where, include });
  }

  async findFirst(params: {
    where: any;
    include?: any;
  }): Promise<any | undefined> {
    const { where, include } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findFirst({ where, include });
  }

  async findAll(params: {
    where: any;
    select?: any;
    include?: any;
    take?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any[] | undefined> {
    const { where, select, include, take, rejectOnNotFound, orderBy } = params;
    const result = await this.prisma[this.entityName].findMany({
      where,
      select,
      include,
      take,
      rejectOnNotFound,
      orderBy,
    });
    return result;
  }

  async aggregate(params: {
    where?: any;
    _count?: any;
    _sum?: any;
  }): Promise<any[] | undefined> {
    const { where, _count, _sum } = params;
    const result = await this.prisma[this.entityName].aggregate({
      where,
      _count,
      _sum,
    });
    return result;
  }

  async count(params: { where: any }): Promise<any[] | undefined> {
    const { where } = params;
    const result = await this.prisma[this.entityName].count({ where });
    return result;
  }
}
