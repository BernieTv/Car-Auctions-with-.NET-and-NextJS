import { Auction, PagedResult } from '@/types';
import AuctionCard from './AuctionCard';

const getData = async (): Promise<PagedResult<Auction>> => {
  const result = await fetch('http://localhost:6001/search?pageSize=10');

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};

const Listings = async () => {
  const data = await getData();

  return (
    <div className="grid grid-cols-4 gap-6">
      {data && data.results.map((auction) => <AuctionCard auction={auction} key={auction.id} />)}
    </div>
  );
};

export default Listings;
