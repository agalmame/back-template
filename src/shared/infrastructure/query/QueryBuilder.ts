import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { ClientQueryOptions, FilterCondition } from "./types";
import { QueryStringSchema } from "../Transformers/QueryTransformer";
import { z } from "zod";

interface QueryBuilderOptions {
    where?: Record<string, any>;
    include?: Record<string, boolean>;
    orderBy?: Record<string, 'asc' | 'desc'>;
    skip?: number;
    take?: number;
   }

   type QueryOptions = z.infer<typeof QueryStringSchema>;


@injectable()
export class PrismaQueryBuilder {
    

    buildQuery(options: QueryOptions): QueryBuilderOptions{
        let query: QueryBuilderOptions = {}
        if (options?.filters?.length) {
          query.where = this.buildWhere(options.filters)  
        }
        if (options?.include?.length) {
            query.include  = this.buildInclude(options.include)
        }
        return query
    }

    private buildInclude(includes: string[]): any {
        const includeClause: any = {}
        includes.forEach(inc => {
            includeClause[inc] = true
        })
        return includes
    }

    private buildWhere(filters: FilterCondition[]): any{
        const where: any = {}
        filters.forEach(filter => {
            switch(filter.operator){
                case 'eq':
                    where[filter.field] = filter.value;
                    break;
                case 'like':
                    where[filter.field] = {contains: filter.value}
                case 'in':
                    where[filter.field] = { in: filter.value };
                    break;
                case 'between':
                    where[filter.field] = { 
                        gte: filter.value[0],
                        lte: filter.value[1]
                    };
                break;
                case 'gt':
                    where[filter.field] = { gt: filter.value };
                break;
                case 'lt':
                    where[filter.field] = { lt: filter.value };
                break;

            }
        })
        return where
    }
}