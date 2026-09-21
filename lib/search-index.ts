import { SearchItem } from "./search/types";
import { OVERVIEW_SEARCH_ITEMS } from "./search/overview-items";
import { GUIDE_SEARCH_ITEMS } from "./search/guide-items";
import { SDK_API_SEARCH_ITEMS } from "./search/sdk-api-items";

export type { SearchItem };

export const SEARCH_INDEX: SearchItem[] = [
  ...OVERVIEW_SEARCH_ITEMS,
  ...GUIDE_SEARCH_ITEMS,
  ...SDK_API_SEARCH_ITEMS,
];
