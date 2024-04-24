import React from 'react';

const getData = async () => {
  const result = await fetch('http://localhost:6001/search');

  if (!result.ok) throw new Error('Failed to fetch the data');

  return result.json();
};

const Listings = async () => {
  const data = await getData();

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Listings;
