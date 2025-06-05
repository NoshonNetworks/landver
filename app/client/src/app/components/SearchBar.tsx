import React from "react";

function SearchBar() {
  return (
    <div className="relative h-fit flex-1">
      <img
        src="/icons/searchIcon.svg"
        className="absolute z-[5] top-[12px] left-3"
        alt=""
      />
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#F9F9F9] py-3 pl-[43px] pr-6 rounded-xl text-black w-full"
      />
    </div>
  );
}

export default SearchBar;
