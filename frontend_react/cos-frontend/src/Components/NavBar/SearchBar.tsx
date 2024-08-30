import React from "react";
import search from "./Search.png";

const SearchBar: React.FC = () => {
  return (
    <form
      className="flex gap-10 px-3  py-2 rounded-3xl bg-neutral-400"
      role="search"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        id="search"
        placeholder="Search anything..."
        className="bg-transparent font-inter text-white border-none outline-none"
      />
      <button type="submit" aria-label="Submit search" className="bg-transparent">
        <img
          loading="lazy"
          src={search}
          className="object-cover-contain shrink-0 aspect-square w-[18px]"
          alt="search"
        />
        
      </button>
    </form>
  );
};

export default SearchBar;
