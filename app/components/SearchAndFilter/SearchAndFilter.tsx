import React from "react";

interface SearchAndFilterProps {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full md:w-1/2"
      />
      <input
        type="text"
        placeholder="Filter by type..."
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full md:w-1/2"
      />
    </div>
  );
};

export default SearchAndFilter;
