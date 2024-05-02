'use client';

import { FieldValues, useForm } from 'react-hook-form';

import { placeBidForAuction } from '@/app/_actions/auctionActions';
import { useBidStore } from '@/hooks/useBidStore';

type Props = {
  auctionId: string;
  highBid: number;
};

const BidForm = ({ auctionId, highBid }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addBid = useBidStore((state) => state.addBid);

  const onSubmit = (data: FieldValues) => {
    placeBidForAuction(auctionId, +data.amount).then((bid): void => {
      addBid(bid);
      reset();
    });
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
