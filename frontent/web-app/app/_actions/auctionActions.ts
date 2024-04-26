'use server';

import { Auction, PagedResult } from '@/types';

export const getData = async (
  pageNumber: number,
  pageSize: number,
): Promise<PagedResult<Auction>> => {
  const result = await fetch(
    `http://localhost:6001/search?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  );

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};
