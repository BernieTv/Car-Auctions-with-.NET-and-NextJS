'use client';

import { ReactNode, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import toast from 'react-hot-toast';
import { User } from 'next-auth';

import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, AuctionFinished, Bid } from '@/types';
import AuctionCreatedToast from '../_components/AuctionCreatedToast';
import { getDetailedViewData } from '../_actions/auctionActions';
import AuctionFinishedToast from '../_components/AuctionFinishedToast';

type Props = {
  children: ReactNode;
  user: User | null;
};

const SignalRProvider = ({ children, user }: Props) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to notification hub');

          connection.on('BidPlaced', (bid: Bid) => {
            if (bid.bidStatus.includes('Accepted')) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }

            addBid(bid);
          });

          connection.on('AuctionCreated', (auction: Auction) => {
            if (user?.username !== auction.seller) {
              return toast(<AuctionCreatedToast auction={auction} />, { duration: 10_000 });
            }
          });

          connection.on('AuctionFinished', (finishedAuction: AuctionFinished) => {
            const auction = getDetailedViewData(finishedAuction.auctionId);

            return toast.promise(
              auction,
              {
                loading: 'Loading',

                success: (auction) => (
                  <AuctionFinishedToast finishedAuction={finishedAuction} auction={auction} />
                ),

                error: () => 'Auction finished!',
              },
              { success: { duration: 10_000, icon: null } },
            );
          });
        })

        .catch((error) => console.error(error));
    }

    return () => {
      connection?.stop();
    };
  }, [connection, setCurrentPrice, addBid, user?.username]);

  return children;
};

export default SignalRProvider;
