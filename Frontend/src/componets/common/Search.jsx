import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const Search = ({ onSearch }) => {
  const { control, watch } = useForm({ defaultValues: { searchVal: "" } });
  const searchVal = watch("searchVal"); // watch single field

  useEffect(() => {
    onSearch(searchVal);
  }, [searchVal, onSearch]); // onSearch ab stable hai due to useCallback

  return (
    <Controller
      name="searchVal"
      control={control}
      render={({ field }) => (
        <input
          type="search"
          placeholder="Search desserts..."
          {...field}
          className="px-3 py-2 w-[300px] bg-gray-100 
             border-2 border-gray-300 
             rounded-md text-gray-800 
             placeholder:text-gray-500 
             focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
        />
      )}
    />
  );
};

export default Search;
