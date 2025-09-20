// FoodProduct component is imported as before
import FoodProduct from "../FoodProduct";

const FeaturedDesserts = () => {
  const desserts = [
    {
      badge: "Veg",
      title: "Chocolate Lava Cake 🍫",
      desc: "Molten lava cake with gooey center.",
      category: "Dessert",
      rating: "4.8",
      price: 250,
      offerPrice: 199,
      // The image path now points to a file in the public directory
      img: "/images/111.jpg", 
    },
    {
      badge: "Veg",
      title: "Classic Tiramisu 🍰",
      desc: "Coffee-soaked layers & mascarpone.",
      category: "Dessert",
      rating: "4.9",
      price: 300,
      offerPrice: 240,
      img: "/images/112.jpg",
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 py-12 px-6">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-12 font-poppins">
        Our Special Desserts
      </h1>
      <div className="grid gap-8 px-4 md:px-12 lg:px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {desserts.map((item) => (
          // Using a unique and stable property for the key, like the title
          <FoodProduct key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDesserts;