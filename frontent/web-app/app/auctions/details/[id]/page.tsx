import { getBidsForAuction, getDetailedViewData } from '@/app/_actions/auctionActions';
import Heading from '@/app/_components/Heading';
import CountdownTimer from '../../CountdownTimer';
import CarImage from '../../CarImage';
import DetailedSpecs from './DetailedSpecs';
import { getCurrentUser } from '@/app/_actions/authActions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const Details = async ({ params: { id } }: { params: { id: string } }) => {
  const auction = await getDetailedViewData(id);
  const user = await getCurrentUser();
  const bids = await getBidsForAuction(id);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${auction.make} ${auction.model}`} />

          {user?.username === auction.seller ? (
            <>
              <EditButton id={auction.id} />
              <DeleteButton id={auction.id} />
            </>
          ) : null}
        </div>

        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>

          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CarImage imageUrl={auction.imageUrl} />
        </div>

        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <Heading title="Bids" />

          {bids.map((bid) => (
            <p key={bid.id}>
              {bid.bidder} - {bid.amount}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={auction} />
      </div>
    </div>
  );
};

export default Details;
