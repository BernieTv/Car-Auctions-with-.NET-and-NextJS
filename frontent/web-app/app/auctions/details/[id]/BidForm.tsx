'use client';

import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { placeBidForAuction } from '@/app/_actions/auctionActions';
import { useBidStore } from '@/hooks/useBidStore';
import { numberWithCommas } from '@/lib/numberWithCommas';

type Props = {
  auctionId: string;
  highBid: number;
};

const BidForm = ({ auctionId, highBid }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const addBid = useBidStore((state) => state.addBid);

  const onSubmit = (data: FieldValues) => {
    if (data.amount <= highBid) {
      reset();

      return toast.error(`Bid must be at least $${numberWithCommas(highBid + 1)}`);
    }

    placeBidForAuction(auctionId, +data.amount)
      .then((bid): void => {
        if (bid.error) throw bid.error;

        addBid(bid);

        reset();
      })

      .catch((error) => toast.error(error.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 rounded-lg py-2">
      <input
        type="number"
        {...register('amount')}
        className="input-custom text-sm text-gray-600"
        placeholder={`Enter your bid (minimum bid is ${highBid + 1})`}
      />
    </form>
  );
};

export default BidForm;
