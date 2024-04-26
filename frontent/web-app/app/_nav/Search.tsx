import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for cark by make, model or color"
        className="flex-grow pl-5 bg-transparent focus:outline-transparent border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
      />

      <button>
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;
