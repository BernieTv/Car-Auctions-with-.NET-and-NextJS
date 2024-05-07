import Heading from '@/app/_components/Heading';
import AuctionForm from '../../AuctionForm';
import { getDetailedViewData } from '@/app/_actions/auctionActions';

const Update = async ({ params: { id } }: { params: { id: string } }) => {
  const auction = await getDetailedViewData(id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading title="Update your auction" subtitle="Please update the details of your car" />

      <AuctionForm auction={auction} />
    </div>
  );
};

export default Update;
