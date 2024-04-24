import AuctionCard from './AuctionCard';

const getData = async () => {
  const result = await fetch('http://localhost:6001/search');

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};

const Listings = async () => {
  const data = await getData();

  return (
    <div>
      {data &&
        data.results.map((auction: any, i: number) => <AuctionCard auction={auction} key={i} />)}
    </div>
  );
};

export default Listings;
