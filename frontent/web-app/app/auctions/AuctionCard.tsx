type Props = {
  auction: any;
};

const AuctionCard = ({ auction }: Props) => {
  return <div>{auction.make}</div>;
};

export default AuctionCard;
