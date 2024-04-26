'use server';

import { Auction, PagedResult } from '@/types';

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  const result = await fetch(`http://localhost:6001/search${query}`);

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};
