// FoodProduct component is imported as before
import { useEffect, useState } from "react";
import FoodProduct from "../FoodProduct";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const FeaturedDesserts = () => {
  const [desserts, setDesserts] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [likedProducts, setLikedProducts] = useState([]);

  const handleOnLike = async (productId) => {
    try {
      const res = await fetch("/api/user/private/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      if (data.message === "Add to favorite") {
        toast.success("Product added to favorites ❤️");
      } else if (data.message === "Remove from favorite") {
        toast.success("Product removed from favorites ♡");
      }

      setLikedProducts((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);//remove from favorite
        }
        return [...prev, productId];//add to favorite
      });
    } catch (error) {
      console.log("Error in add to favorite:", error);
      toast.error("Error in add to favorite, please try again later");
    }
  };

  //fetch desserts from backend
  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const response = await fetch("/api/user/getHomeProduct", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setDesserts(data.products);
      } catch (error) {
        console.error("Error fetching desserts:", error);
      }
    };

    fetchDesserts();
  }, []);

  //fetch favorites from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/user/private/getAllFavorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && data.favorites) {
          const favoriteIds = data.favorites.map((item) => item.productId);
          setLikedProducts(favoriteIds);
        }
      } catch (error) {
        console.error("Error fetching desserts:", error);
      }
    };

    if (isAuthenticated) fetchFavorites();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 py-12 ">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-12 font-poppins">
        Our Special Desserts
      </h1>
      <div className="flex flex-wrap justify-evenly gap-5 w-full">
        {desserts.map((item) => (
          <FoodProduct
            key={item.id}
            item={item}
            handleOnLike={handleOnLike}
            isAuthenticated={isAuthenticated}
            likedProducts={likedProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDesserts;
