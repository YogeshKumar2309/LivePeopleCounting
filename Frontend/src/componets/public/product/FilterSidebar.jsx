import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const FilterSidebar = ({handleFilter}) => {

  //useForm initialize
  const {control, watch} = useForm({
    defaultValues: {
      category: "",
      badge: "",
      price: "",
    },
  })

const category = watch("category");
const badge = watch("badge");
const price = watch("price");

useEffect(() => {
  handleFilter({ category, badge, price });
}, [category, badge, price, handleFilter]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 capitalize text-stone-500">Filters desserts here ...</h2>
      {/*category*/}
      <div className="mb-4">
        <div className="font-semibold mb-3 pb-1 border-b-2 border-stone-200">Category</div>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
         <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value=""
                  checked={field.value === ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
                All
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="cakes"
                  checked={field.value === "cakes"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
                Cakes
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="pastries"
                  checked={field.value === "pastries"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
              Pastries
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="cookies"
                  checked={field.value === "cookies"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
                Cookies & Biscuits
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="icecreams"
                  checked={field.value === "icecreams"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Ice Creams & Frozen Desserts
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="puddings"
                  checked={field.value === "puddings"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Puddings & Custards
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="chocolates"
                  checked={field.value === "chocolates"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Chocolates & Confections
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="fruit-based"
                  checked={field.value === "fruit-based"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Fruit-based Desserts
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="traditional"
                  checked={field.value === "traditional"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Traditional / Regional Desserts
              </label>
            </div>
        )}
        />
      </div>

      {/* badge */}
      <div>
        <div className="font-semibold mb-3 pb-1 border-b-2 border-stone-200 " >Badge</div>
         <Controller
          name="badge"
          control={control}
          render={({ field }) => (
         <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value=""
                  checked={field.value === ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
                All
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="veg"
                  checked={field.value === "veg"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Veg
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="non-veg"
                  checked={field.value === "non-veg"}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mr-2"
                />
               Non-Veg
              </label>
      </div>
          )}
        />
      </div>  

      {/* price */}
<div className="mt-4">
  <div className="font-semibold mb-3 pb-1 border-b-2 border-stone-200">Price</div>
  <Controller
    name="price"
    control={control}
    render={({ field }) => (
      <div className="flex flex-col space-y-2 mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value=""
            checked={field.value === ""}
            onChange={(e) => field.onChange(e.target.value)}
            className="mr-2"
          />
          All
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="1-50"
            checked={field.value === "1-50"}
            onChange={(e) => field.onChange(e.target.value)}
            className="mr-2"
          />
          ₹1 – ₹50
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="50-100"
            checked={field.value === "50-100"}
            onChange={(e) => field.onChange(e.target.value)}
            className="mr-2"
          />
          ₹50 – ₹100
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="100-500"
            checked={field.value === "100-500"}
            onChange={(e) => field.onChange(e.target.value)}
            className="mr-2"
          />
          ₹100-₹500
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="500+"
            checked={field.value === "500+"}
            onChange={(e) => field.onChange(e.target.value)}
            className="mr-2"
          />
          ₹500+
        </label>
      </div>
    )}
  />
</div>
 
    </div>
  );
};

export default FilterSidebar;
