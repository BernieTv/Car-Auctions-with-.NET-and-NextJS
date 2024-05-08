'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

import { useParamsStore } from '@/hooks/useParamsStore';

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);

  const router = useRouter();
  const pathname = usePathname();

  const onChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const search = () => {
    if (pathname !== '/') router.push('/');

    setParams({ searchTerm: searchValue });
  };

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') search();
        }}
        value={searchValue}
        onChange={onChange}
        type="text"
        placeholder="Search for cark by make, model or color"
        className="input-custom text-sm text-gray-600"
      />

      <button onClick={search}>
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;