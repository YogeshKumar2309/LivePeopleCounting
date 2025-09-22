import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activePage, setActivePage] = useState("page1");

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;

      try {
        const res = await fetch(
          `/api/user/getProductDetails?productId=${productId}`
        );
        const data = await res.json();
        console.log(data);

        setProduct(data.products[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetails();
  }, []);

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320vh]">
      <img
        src={product.image}
        alt=""
        className="absolute -z-20  w-full h-full object-cover  overflow-x-hidden blur-xsm opacity-45"
      />
      <div className="w-full">
        <div className="pt-2 sm:mx-6 h-screen sm:h-[60vh] flex flex-col sm:flex-row ">
          <div className="flex-1">
            <img
              src={product.image}
              alt=""
              className=" w-full h-[50vh] sm:h-full object-fit rounded-2xl pt-1 shadow-white shadow-md "
            />
          </div>
          <div className=" bg-stone-700 flex-1 blur-3xl opacity-90 shadow-2xl shadow-stone-950"></div>
          {/* absolute right side div */}
          <div className="absolute top-[51vh] sm:top-3 sm:right-0 sm:w-[45vw] rounded-2xl shadow-white shadow-md pt-2 sm:mx-6 h-[45vh] sm:h-[57vh] ps-5 pr-2 py-4">
            <h5>{product.title}</h5>
            <h6>{product.desc}</h6>
            <h6>{product.price}</h6>
            <h6>{product.offerPrice}</h6>
            <h6>{product.badge}</h6>
            <h6>{product.active}</h6>
            <h6>{product.createdAt}</h6>
          </div>
        </div>
      </div>
      <div className="bg-black h-[12vh] blur-3xl"></div>
      {/* absolute btn div */}
      <div className="h-[12vh]  absolute sm:top-[60vh] top-[100vh] w-full flex justify-around items-center font-bold text-md sm:text-xl">
        <div className="border-sky-700 border-2 rounded-2xl px-2 hover:bg-sky-900 hover:text-white hover:cursor-pointer"
        onClick={() => setActivePage("page1")}
        >
      Page1
        </div>
        <div className="border-sky-700 border-2 rounded-2xl px-2 hover:bg-sky-900 hover:text-white hover:cursor-pointer"
        onClick={() => setActivePage("page2")}
        >
      Page2
        </div>
       
        
      </div>
      <div className="h-[255vh]">
        {activePage === "page1" && <h1>Page 1 Content</h1>}
        {activePage === "page2" && <h1>Page 2 Content</h1>}
      </div>
     </div>
  );
};

export default ProductDetails;
