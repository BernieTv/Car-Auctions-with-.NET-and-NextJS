'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';

import { deleteAuction } from '@/app/_actions/auctionActions';

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const doDelete = () => {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error;

        router.push('/');
      })
      .catch((error: any) => {
        toast.error(`${error.status} ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button color="failure" isProcessing={loading} onClick={doDelete}>
      Delete Auction
    </Button>
  );
};

export default DeleteButton;
