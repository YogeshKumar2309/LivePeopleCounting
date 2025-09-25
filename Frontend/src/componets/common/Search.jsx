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
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    />
  );
};

export default Search;
