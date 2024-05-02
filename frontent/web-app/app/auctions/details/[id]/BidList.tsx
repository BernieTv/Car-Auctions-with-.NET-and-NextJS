'use client';

import { useEffect, useState } from 'react';
import { User } from 'next-auth';
import toast from 'react-hot-toast';

import { Auction, Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import { getBidsForAuction } from '@/app/_actions/auctionActions';
import Heading from '@/app/_components/Heading';
import BidItem from './BidItem';
import { numberWithCommas } from '@/lib/numberWithCommas';
import EmptyFilter from '@/app/_components/EmptyFilter';
import BidForm from './BidForm';

type Props = {
  user: User | null;
  auction: Auction;
};

const BidList = ({ user, auction }: Props) => {
  const [loading, setLoading] = useState(true);

  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);

  const highBid = bids.reduce(
    (prev, current) => (prev > current.amount ? prev : current.amount),
    0,
  );

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((results: any) => {
        if (results.error) {
          throw results.error;
        }

        setBids(results as Bid[]);
      })

      .catch((error) => {
        toast.error(error.message);
      })

      .finally(() => setLoading(false));
  }, [auction.id, setBids]);

  if (loading) return <span>Loading bids...</span>;

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 p-2">
          <Heading title={`Current high bid is ${numberWithCommas(highBid)}`} />
        </div>
      </div>

      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter title="No bids for this item" subtitle="Please feel free to make a bid" />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        <BidForm auctionId={auction.id} highBid={highBid} />
      </div>
    </div>
  );
};

export default BidList;
