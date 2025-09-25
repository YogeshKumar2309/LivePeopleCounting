import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import FoodProduct from "../../componets/public/FoodProduct";
import {
  fetchDesserts,
  fetchFavorites,
  toggleFavoriteAsync,
} from "../../features/liked/likedSlice";
import LoaderComponent from "../../componets/common/Loader";
import Search from "../../componets/common/Search";

const Products = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const dispatch = useDispatch();
  const { desserts, likedProducts } = useSelector((state) => state.liked);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDesserts());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchFavorites());
  }, [isAuthenticated, dispatch]);

  const handleOnLike = (productId) => {
    dispatch(toggleFavoriteAsync(productId));
  };
  return (
    <>
      <div className="bg-stone-200 h-12 w-full mt-2 flex items-center justify-between px-4 shadow-sm">
        <button
          onClick={() => setToggleSidebar(!toggleSidebar)}
          className="flex items-center gap-2 bg-stone-400 text-white px-3 py-1 rounded-md hover:bg-stone-500 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        <Search/>
        <p className="font-semibold">{desserts.length} products</p>
      </div>
      <div className="flex">
        <div className="sidebar border-r border-stone-200 border-b ">
          {toggleSidebar && (
            <div className="w-56 sm:w-76 p-4">
              sidebar
            </div>
          )}
        </div>
        <div className="main flex-1 bg-stone-100 min-h-screen overflow-hidden pt-4">
          <div className="flex flex-wrap justify-evenly gap-5 w-full ">
          {desserts.length === 0 ? (
            <LoaderComponent />
          ) : (
            desserts.map((item) => (
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
