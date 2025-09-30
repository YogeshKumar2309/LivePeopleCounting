const API_BASE = import.meta.env.VITE_API_BASE;

import { useState, useEffect, useCallback } from "react";
import { Loader, SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import FoodProduct from "../../componets/public/FoodProduct";
import {
  fetchFavorites,
  toggleFavoriteAsync,
} from "../../features/liked/likedSlice";
import Search from "../../componets/common/Search";
import FilterSidebar from "../../componets/public/product/FilterSidebar";

const Products = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [filterValues, setFilterValues] = useState({
    category: "",
    badge: "",
    price: "",
  });
  const [filterProducts, setFilterProducts] = useState([]);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { likedProducts } = useSelector((state) => state.liked);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOnLike = (productId) => {
    dispatch(toggleFavoriteAsync(productId));
  };

  //handle filter funtion in sidebar
  const handleFilter = useCallback((values) => {
    setFilterValues(values);
  }, []);

  //handle serach val
  const handleSearchVal = useCallback((val) => {
    setSearchVal(val);
  }, []);

  //build query string
  useEffect(() => {
    const params = new URLSearchParams();
    if (filterValues.category) params.append("category", filterValues.category);
    if (filterValues.badge) params.append("badge", filterValues.badge);
    if (filterValues.price) params.append("price", filterValues.price);
    if (searchVal) params.append("search", searchVal);

    setQuery(params.toString());
  }, [filterValues, searchVal]);

  // fetch filtered products
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const url = query
          ? `${API_BASE}/api/user/filteredProducts?${query}`
          : `${API_BASE}/api/user/filteredProducts`;
        const res = await fetch(url);
        const data = await res.json();
        setFilterProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFilteredProducts();
  }, [query]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchFavorites());
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <div className="bg-stone-200 h-16 w-full mt-2 flex items-center justify-between px-12 shadow-sm sticky top-0 z-30">
        <button
          onClick={() => setToggleSidebar(!toggleSidebar)}
          className="flex items-center gap-2 bg-stone-400 text-white px-3 py-1 rounded-md hover:bg-stone-500 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        <Search onSearch={handleSearchVal} />
        <p className="font-semibold">{filterProducts.length} products</p>
      </div>
      <div className="flex">
        <div className="sidebar border-r border-stone-200 border-b sticky top-12 z-10 h-[calc(100vh-3rem)] overflow-y-auto pb-8 pt-1 ps-1">
          {toggleSidebar && (
            <div className="w-56 sm:w-76 p-4">
              <FilterSidebar handleFilter={handleFilter} />
            </div>
          )}
        </div>
        <div className="main flex-1 bg-stone-100 min-h-screen overflow-hidden pt-4">
          <div className="flex flex-wrap justify-evenly gap-5 w-full ">
            {filterProducts.length === 0 ? (
              <>
                <p className="text-blue-700 font-semibold text-center mt-16 text-2xl flex flex-col items-center justify-center">
                <Loader className=" h-12 w-12 animate-bounce text-blue-700 flext items-center justify-center ms-4 mt-1" />
                 <p>Product not found</p>
                </p>
              </>
            ) : (
              filterProducts.map((item, index) => (
                <FoodProduct
                  key={item._id || index}
                  item={item}
                  handleOnLike={handleOnLike}
                  isAuthenticated={isAuthenticated}
                  likedProducts={likedProducts}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
