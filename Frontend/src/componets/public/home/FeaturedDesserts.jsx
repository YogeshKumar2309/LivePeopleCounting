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
    {
      badge: "Veg",
      title: "Strawberry Cheesecake 🍓",
      desc: "Cheesecake topped with strawberry compote.",
      category: "Dessert",
      rating: "4.7",
      price: 280,
      offerPrice: 210,
      img: "/images/113.jpg",
    },
    {
      badge: "Veg",
      title: "Brownie Sundae 🍨",
      desc: "Brownie with vanilla ice cream & chocolate sauce.",
      category: "Dessert",
      rating: "4.6",
      price: 220,
      offerPrice: 180,
      img: "/images/114.jpg",
    },
    {
      badge: "Veg",
      title: "Gulab Jamun with Rabri 🍯",
      desc: "Gulab jamuns with chilled rabri.",
      category: "Dessert",
      rating: "4.8",
      price: 150,
      offerPrice: 120,
      img: "/images/115.jpg",
    },
    {
      badge: "Veg",
      title: "Mango Mousse 🍮",
      desc: "Airy mango mousse with fresh chunks.",
      category: "Dessert",
      rating: "4.5",
      price: 200,
      offerPrice: 160,
      img: "/images/116.jpg",
    },
    {
      badge: "Veg",
      title: "Blueberry Muffin 🫐",
      desc: "Soft muffin bursting with blueberries.",
      category: "Bakery",
      rating: "4.6",
      price: 120,
      offerPrice: 99,
      img: "/images/117.jpg",
    },
    {
      badge: "Veg",
      title: "Apple Pie 🍏",
      desc: "Classic American apple pie with cinnamon.",
      category: "Dessert",
      rating: "4.7",
      price: 250,
      offerPrice: 199,
      img: "/images/118.jpg",
    },
    {
      badge: "Veg",
      title: "Red Velvet Cupcake ❤️",
      desc: "Moist cupcake topped with cream cheese frosting.",
      category: "Bakery",
      rating: "4.8",
      price: 100,
      offerPrice: 80,
      img: "/images/119.jpg",
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