'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { Button } from 'flowbite-react';

import Input from '../_components/Input';

const AuctionForm = () => {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
