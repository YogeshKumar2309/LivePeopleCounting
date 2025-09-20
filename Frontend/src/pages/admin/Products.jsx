import React from "react";
import Food from "../../componets/admin/Food";
import { useState } from "react";
import { useEffect } from "react";

const Products = () => {
  const [foods, setFoods] = useState([
    {
      badge: "Veg",
      title: "Brownie Sundae 🍨",
      desc: "Brownie with vanilla ice cream & chocolate sauce.",
      category: "Dessert",
      rating: "4.6",
      price: 220,
      offerPrice: 180,
      img: "/assets/img11.jpg",
      active: true,
    },
  ]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/admin/getProducts", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
       setFoods(data.products);
      
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Food foods={foods} />
    </div>
  );
};

export default Products;
