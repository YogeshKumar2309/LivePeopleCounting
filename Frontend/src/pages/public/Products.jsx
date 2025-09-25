import { useState, useEffect, use, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import FoodProduct from "../../componets/public/FoodProduct";
import {
  fetchFavorites,
  toggleFavoriteAsync,
} from "../../features/liked/likedSlice";
import LoaderComponent from "../../componets/common/Loader";
import Search from "../../componets/common/Search";
import { fetchAllDesserts } from "../../features/product/ProductSlice";
import FilterSidebar from "../../componets/public/product/FilterSidebar";


const Products = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [filterValues, setFilterValues] = useState({
    category: "",
    badge: "",
    price: "",
  });
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { likedProducts } = useSelector((state) => state.liked);
  const { products } = useSelector((state) => state.products);
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
  useEffect(() => {
    const params = new URLSearchParams();

    if (filterValues.category) params.append("category", filterValues.category);
    if (filterValues.badge) params.append("badge", filterValues.badge);
    if (filterValues.price) params.append("price", filterValues.price);
    if (searchVal) params.append("search", searchVal);

    setQuery(params.toString());
  }, [filterValues, searchVal]);

  useEffect(() => {
    dispatch(fetchAllDesserts());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchFavorites());
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <div className="bg-stone-200 h-12 w-full mt-2 flex items-center justify-between px-4 shadow-sm">
        <button
          onClick={() => setToggleSidebar(!toggleSidebar)}
          className="flex items-center gap-2 bg-stone-400 text-white px-3 py-1 rounded-md hover:bg-stone-500 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        <Search onSearch={handleSearchVal} />
        <p className="font-semibold">{products.length} products</p>
      </div>
      <div className="flex">
        <div className="sidebar border-r border-stone-200 border-b ">
          {toggleSidebar && (
            <div className="w-56 sm:w-76 p-4">
              <FilterSidebar handleFilter={handleFilter} />
            </div>
          )}
        </div>
        <div className="main flex-1 bg-stone-100 min-h-screen overflow-hidden pt-4">
          <div className="flex flex-wrap justify-evenly gap-5 w-full ">
            {products.length === 0 ? (
              <LoaderComponent />
            ) : (
              products.map((item) => (
                <FoodProduct
                  key={item._id}
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
