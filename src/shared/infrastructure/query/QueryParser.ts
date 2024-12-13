import { injectable } from "tsyringe";
import { ClientQueryOptions, sortDirection } from "./types";

interface reqQuery {
    [key: string]: string 
}
@injectable()
class PrismaQueryParser {

    parseQuery(reqQuery: reqQuery): ClientQueryOptions {
        let options: ClientQueryOptions = {} ;
        if(reqQuery?.filters) {
            options.filters =  JSON.parse(reqQuery.filters);
        }
        if (reqQuery?.include){
            options.include = reqQuery.include.split(',')
        }
        if (reqQuery?.select) {
            options.select = reqQuery.include.split(',')
        }
        if (reqQuery?.sort) {
            options.sort = reqQuery.sort.split(',').map(s => {
                const [field, direction] = s.split(':')
                return {field, direction: direction as sortDirection}
            })
        }
        if (reqQuery.page) {
            options.page = parseInt(reqQuery.page as string);
            options.limit = parseInt(reqQuery.limit as string) || 10;
          }
        return options;
    }

}

export  {PrismaQueryParser};