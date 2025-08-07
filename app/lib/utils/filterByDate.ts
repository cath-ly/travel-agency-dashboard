import type { Document } from "../schema/document";

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

const filterByDate: FilterByDate = (items, key, start, end) =>
  items.filter((item) => item[key] >= start && (!end || item[key] <= end))
    .length;

export default filterByDate;
