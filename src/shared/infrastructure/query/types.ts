export type FilterOperator = 
  | 'eq'    
  | 'neq'   
  | 'gt'    
  | 'gte'   
  | 'lt'    
  | 'lte'  
  | 'like'  
  | 'in'    
  | 'between';

export type sortDirection =  'asc' | 'desc'
export interface FilterCondition {
    field: string;
    operator: FilterOperator;
    value?: any;
}

export interface ClientQueryOptions {
    filters?: FilterCondition[];
    include?: string[];  
    select?: string[];   
    sort?: {
        field: string;
        direction: sortDirection;
    }[];
    page?: number;
    limit?: number;

}