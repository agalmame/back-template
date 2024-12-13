import { z } from 'zod';

// Base schemas
export const FilterOperatorSchema = z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'between']);
export const SortDirectionSchema = z.enum(['asc', 'desc']);

// Query string specific schemas
export const QueryFilterSchema = z.preprocess((val) => {
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
}, z.array(
  z.object({
    field: z.string(),
    operator: FilterOperatorSchema,
    value: z.any()
  }).required()
).default([]));

export const QuerySortSchema = z.preprocess((val) => {
  if (typeof val !== 'string') return val;
  return val.split(',').map(sort => {
    const [field, direction] = sort.split(':');
    return { field, direction };
  });
}, z.array(z.object({
  field: z.string(),
  direction: SortDirectionSchema
})));

export const QueryIncludeSchema = z.preprocess((val) => {
  if (typeof val !== 'string') return val;
  return val.split(',');
}, z.array(z.string()));

export const QuerySelectSchema = z.preprocess((val) => {
  if (typeof val !== 'string') return val;
  return val.split(',');
}, z.array(z.string()));

export const QueryStringSchema = z.object({
  filters: QueryFilterSchema.optional(),
  include: QueryIncludeSchema.optional(),
  select: QuerySelectSchema.optional(),
  sort: QuerySortSchema.optional(),
  page: z.preprocess((val) => Number(val), z.number().int().positive()).optional(),
  limit: z.preprocess((val) => Number(val), z.number().int().positive()).optional()
});
