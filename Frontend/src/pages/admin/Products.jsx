const API_BASE = import.meta.env.VITE_API_BASE;

import Food from "../../componets/admin/Food";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [foods, setFoods] = useState([ ]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/getProducts`, {
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
