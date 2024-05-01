'use client';

import { useEffect, useState } from 'react';
import { User } from 'next-auth';
import toast from 'react-hot-toast';

import { Auction, Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import { getBidsForAuction } from '@/app/_actions/auctionActions';
import Heading from '@/app/_components/Heading';
import BidItem from './BidItem';

type Props = {
  user: User | null;
  auction: Auction;
};

const BidList = ({ user, auction }: Props) => {
  const [loading, setLoading] = useState(true);

  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);

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
    <div className="border-2 rounded-lg p-2 bg-gray-100">
      <Heading title="Bids" />

      {bids.map((bid) => (
        <BidItem key={bid.id} bid={bid} />
      ))}
    </div>
  );
};

export default BidList;
