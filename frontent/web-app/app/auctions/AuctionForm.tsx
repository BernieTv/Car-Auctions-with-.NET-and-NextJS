'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';

import Input from '../_components/Input';
import DateInput from '../_components/DateInput';
import { createAuction, updateAuction } from '../_actions/auctionActions';
import { Auction } from '@/types';

type Props = {
  auction?: Auction;
};

const AuctionForm = ({ auction }: Props) => {
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onTouched' });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;

      reset({ make, model, color, mileage, year });
    }

    setFocus('make');
  }, [setFocus, auction, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = '';
      let result;

      if (pathname === '/auctions/create') {
        result = await createAuction(data);

        id = result.id;
      } else {
        if (auction) {
          result = await updateAuction(data, auction.id);

          id = auction.id;
        }
      }

      if (result.error) {
        throw result.error;
      }

      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(`${error.status} ${error.message}`);
    }
  };

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Make" name="make" control={control} rules={{ required: 'Make is required' }} />

      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: 'Model is required' }}
      />

      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: 'Color is required' }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: 'Year is required' }}
        />

        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: 'Mileage is required' }}
        />
      </div>

      {pathname === '/auctions/create' ? (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: 'Image URL is required' }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: 'Reserve price is required' }}
            />

            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              control={control}
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              rules={{ required: 'Auction end date is required' }}
            />
          </div>
        </>
      ) : null}

      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>

        <Button
          outline
          color="success"
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AuctionForm;
