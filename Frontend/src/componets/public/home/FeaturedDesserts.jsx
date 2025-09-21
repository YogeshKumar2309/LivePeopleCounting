// FoodProduct component is imported as before
import { useEffect, useState } from "react";
import FoodProduct from "../FoodProduct";

const FeaturedDesserts = () => {
  const [desserts, setDesserts] = useState([ ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 py-12 ">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-12 font-poppins">
        Our Special Desserts
      </h1>
      <div className="flex flex-wrap justify-evenly gap-5 w-full">
        {desserts.map((item) => (
          <FoodProduct key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDesserts;
