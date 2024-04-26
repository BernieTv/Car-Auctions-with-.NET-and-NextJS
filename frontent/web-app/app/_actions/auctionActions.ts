'use server';

import { Auction, PagedResult } from '@/types';

export const getData = async (pageNumber: number = 1): Promise<PagedResult<Auction>> => {
  const result = await fetch(`http://localhost:6001/search?pageSize=4&pageNumber=${pageNumber}`);

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};
