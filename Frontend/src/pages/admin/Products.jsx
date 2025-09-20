import React from "react";
import Food from "../../componets/admin/Food";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleEditProduct = async (f) => {
    navigate(`/admin/products/edit/${f._id}`, { state: { product: f } });
  };

  return (
    <div>
      <Food foods={foods} editProduct={handleEditProduct} />
    </div>
  );
};

export default Products;
