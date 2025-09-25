// // FoodProduct component is imported as before
// import { useEffect, useState } from "react";
// import FoodProduct from "../FoodProduct";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { addLike, removeLike, toggleFavorite } from "../../../features/liked/likedSlice"

// const FeaturedDesserts = () => {
//   const [desserts, setDesserts] = useState([]);
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   // const [likedProducts, setLikedProducts] = useState([]);

//   const dispatch = useDispatch();
//   const likedProducts = useSelector((state) => state.liked.likedProducts);

//   // const isLiked = likedProducts.includes(item?.id);

//   // const handleOnLike = async (productId) => {
//   //   try {
//   //     const res = await fetch("/api/user/private/favorite", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       credentials: "include",
//   //       body: JSON.stringify({ productId }),
//   //     });
//   //     const data = await res.json();

//   //     if (!res.ok) throw new Error(data.message);
//   //     if (data.message === "Add to favorite") {
//   //       toast.success("Product added to favorites ❤️");
//   //       dispatch(addLike(productId));// add the redux action here
//   //     } else if (data.message === "Remove from favorite") {
//   //       toast.success("Product removed from favorites ♡");
//   //       dispatch(removeLike(productId));// remove the redux action here
//   //     }

//   //     // setLikedProducts((prev) => {
//   //     //   if (prev.includes(productId)) {
//   //     //     return prev.filter((id) => id !== productId); //remove from favorite
//   //     //   }
//   //     //   return [...prev, productId]; //add to favorite
//   //     // });
//   //      } catch (error) {
//   //     console.log("Error in add to favorite:", error);
//   //     toast.error("Error in add to favorite, please try again later");
//   //   }
//   // };

//   const handleOnLike = (productId) => {
//     dispatch(toggleFavorite(productId));
//   }

//   //fetch desserts from backend
//   useEffect(() => {
//     const fetchDesserts = async () => {
//       try {
//         const response = await fetch("/api/user/getHomeProduct", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         setDesserts(data.products);
//       } catch (error) {
//         console.error("Error fetching desserts:", error);
//       }
//     };

//     fetchDesserts();
//   }, []);

//   //fetch favorites from backend
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch("/api/user/private/getAllFavorites", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
//         const data = await response.json();
//         if (response.ok && data.favorites) {
//           const favoriteIds = data.favorites.map((item) => item.productId);
//           // setLikedProducts(favoriteIds);
//           favoriteIds.forEach((id) => dispatch(addLike(id)));// set the redux action here
//         }
//       } catch (error) {
//         console.error("Error fetching desserts:", error);
//       }
//     };

//     if (isAuthenticated) fetchFavorites();
//   }, [isAuthenticated,dispatch]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 py-12 ">
//       <h1 className="text-center text-4xl font-bold text-gray-800 mb-12 font-poppins">
//         Our Special Desserts
//       </h1>
//       <div className="flex flex-wrap justify-evenly gap-5 w-full">
//         {desserts.map((item) => (
//           <FoodProduct
//             key={item.id}
//             item={item}
//             handleOnLike={handleOnLike}
//             isAuthenticated={isAuthenticated}
//             likedProducts={likedProducts}//pass the redux state
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedDesserts;

import { useEffect } from "react";
import FoodProduct from "../FoodProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesserts,
  fetchFavorites,
  toggleFavoriteAsync,
} from "../../../features/liked/likedSlice";
import LoaderComponent from "../../common/Loader";

const FeaturedDesserts = () => {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 py-12 ">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-12 font-poppins">
        Our Special Desserts
      </h1>
      <div className="flex flex-wrap justify-evenly gap-5 w-full">
        {desserts.length === 0 ? (
          <LoaderComponent/>
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
  );
};

export default FeaturedDesserts;
