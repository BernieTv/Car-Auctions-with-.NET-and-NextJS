'use server';

import { Auction, PagedResult } from '@/types';

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  const result = await fetch(`http://localhost:6001/search${query}`);

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};

export const updateAuctionTest = async () => {
  const data = {
    mileage: Math.floor(Math.random() * 100_000) + 1,
  };

  const res = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', {
    method: 'PUT',
    headers: {},
    body: JSON.stringify(data),
  });

  if (!res.ok) return { status: res.status, message: res.statusText };

  return res.statusText;
};
