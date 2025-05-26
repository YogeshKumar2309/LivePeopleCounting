import PopularFood from "./PopularFood";
import styles from "./PopularFoods.module.css";
import HeroGap from "./HeroGap";

import img1 from "../assets/11.jpg";
import img2 from "../assets/22.jpg";
import img3 from "../assets/33.jpg";
import img4 from "../assets/44.jpg";
import img5 from "../assets/55.jpg";
import img6 from "../assets/66.jpg";

const PopularFoods = () => {
  const foodItems = [
    {
      badge: "Veg",
      title: "Chocolate Lava Cake 🍫 ",
      desc: "A rich molten lava cake served with a scoop of creamy vanilla ice cream.",
      category: "Dessert",
      rating: "4.8",
      price: 250,
      offerPrice: 199,
      img: img1,
    },
    {
      badge: "Veg",
      title: "Classic Tiramisu 🍰",
      desc: "An Italian dessert made with layers of coffee-soaked ladyfingers & mascarpone.",
      category: "Dessert",
      rating: "4.9",
      price: 300,
      offerPrice: 240,
      img: img2,
    },
    {
      badge: "Veg",
      title: "Strawberry Cheesecake 🍓",
      desc: "Creamy cheesecake topped with fresh strawberry compote.",
      category: "Dessert",
      rating: "4.7",
      price: 280,
      offerPrice: 210,
      img: img3,
    },
    {
      badge: "Veg",
      title: "Brownie Sundae 🍨",
      desc: "Warm brownie served with vanilla ice cream and chocolate sauce.",
      category: "Dessert",
      rating: "4.6",
      price: 220,
      offerPrice: 180,
      img: img4,
    },
    {
      badge: "Veg",
      title: "Apple Crumble Pie 🍏",
      desc: "Warm apple pie with a crunchy crumble topping and cinnamon flavor.",
      category: "Dessert",
      rating: "4.6",
      price: 240,
      offerPrice: 200,
      img: img5,
    },
    {
      badge: "Veg",
      title: "Mango Mousse 🍮",
      desc: "Light and airy mango mousse topped with fresh mango chunks.",
      category: "Dessert",
      rating: "4.5",
      price: 200,
      offerPrice: 160,
      img: img6,
    },
  ];

  return (
    <>
      <h1 className={styles.title}>Popular Desserts</h1>
      <HeroGap />
      <div className={styles.myContainer}>
        {foodItems.map((item, index) => (
          <PopularFood key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default PopularFoods;
