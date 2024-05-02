'use server';

import { FieldValues } from 'react-hook-form';
import { revalidatePath } from 'next/cache';

import { Auction, Bid, PagedResult } from '@/types';
import { fetchWrapper } from '@/lib/fetchWrapper';

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  const results = await fetchWrapper.get(`search${query}`);

  revalidatePath(`/`);

  return results;
};

export const updateAuctionTest = async () => {
  const data = {
    mileage: Math.floor(Math.random() * 100_000) + 1,
  };

  return await fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
};

export const createAuction = async (data: FieldValues) => {
  return await fetchWrapper.post('auctions', data);
};

export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`auctions/${id}`);
};

export const updateAuction = async (data: FieldValues, id: string) => {
  const result = await fetchWrapper.put(`auctions/${id}`, data);

  revalidatePath('/auctions', 'layout');

  return result;
};

export const deleteAuction = async (id: string) => {
  return await fetchWrapper.del(`auctions/${id}`);
};

export const getBidsForAuction = async (id: string): Promise<Bid[]> => {
  return await fetchWrapper.get(`bids/${id}`);
};

export const placeBidForAuction = async (auctionId: string, amount: number) => {
  return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {});
};
