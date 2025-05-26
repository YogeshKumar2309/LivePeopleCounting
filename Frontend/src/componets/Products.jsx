// Products.jsx
import PopularFood from "./PopularFood";
import styles from "./Products.module.css";
import img1 from "../assets/111.jpg";
import img2 from "../assets/112.jpg";
import img3 from "../assets/113.jpg";
import img4 from "../assets/114.jpg";
import img5 from "../assets/115.jpg";
import img6 from "../assets/116.jpg";
import img7 from "../assets/117.jpg";
import img8 from "../assets/118.jpg";
import img9 from "../assets/119.jpg";
import img10 from "../assets/120.jpg";
// import img11 from "../assets/1.jpg";
// import img12 from "../assets/1.jpg";
// import img13 from "../assets/1.jpg";
// import img14 from "../assets/1.jpg";
// import img15 from "../assets/1.jpg";
// import img16 from "../assets/1.jpg";
// import img17 from "../assets/1.jpg";
// import img18 from "../assets/1.jpg";
// import img19 from "../assets/1.jpg";
// import img20 from "../assets/1.jpg";
// import img21 from "../assets/1.jpg";
// import img22 from "../assets/1.jpg";
// import img23 from "../assets/1.jpg";
// import img24 from "../assets/1.jpg";
// import img25 from "../assets/1.jpg";
// import img26 from "../assets/1.jpg";
// import img27 from "../assets/1.jpg";
// import img28 from "../assets/1.jpg";
// import img29 from "../assets/1.jpg";
// import img30 from "../assets/1.jpg";

const Products = () => {
  const desserts = [
  
 { badge: "Veg", title: "Chocolate Lava Cake 🍫", desc: "Molten lava cake with gooey center.", category: "Dessert", rating: "4.8", price: 250, offerPrice: 199, img: img1 },
  { badge: "Veg", title: "Classic Tiramisu 🍰", desc: "Coffee-soaked layers & mascarpone.", category: "Dessert", rating: "4.9", price: 300, offerPrice: 240, img: img2 },
  { badge: "Veg", title: "Strawberry Cheesecake 🍓", desc: "Cheesecake topped with strawberry compote.", category: "Dessert", rating: "4.7", price: 280, offerPrice: 210, img: img3 },
  { badge: "Veg", title: "Brownie Sundae 🍨", desc: "Brownie with vanilla ice cream & chocolate sauce.", category: "Dessert", rating: "4.6", price: 220, offerPrice: 180, img: img4 },
  { badge: "Veg", title: "Gulab Jamun with Rabri 🍯", desc: "Gulab jamuns with chilled rabri.", category: "Dessert", rating: "4.8", price: 150, offerPrice: 120, img: img5 },
  { badge: "Veg", title: "Mango Mousse 🍮", desc: "Airy mango mousse with fresh chunks.", category: "Dessert", rating: "4.5", price: 200, offerPrice: 160, img: img6 },
  { badge: "Veg", title: "Blueberry Muffin 🫐", desc: "Soft muffin bursting with blueberries.", category: "Bakery", rating: "4.6", price: 120, offerPrice: 99, img: img7 },
  { badge: "Veg", title: "Apple Pie 🍏", desc: "Classic American apple pie with cinnamon.", category: "Dessert", rating: "4.7", price: 250, offerPrice: 199, img: img8 },
  { badge: "Veg", title: "Red Velvet Cupcake ❤️", desc: "Moist cupcake topped with cream cheese frosting.", category: "Bakery", rating: "4.8", price: 100, offerPrice: 80, img: img9 },
  // { badge: "Veg", title: "Belgian Waffles 🧇", desc: "Crispy waffles with maple syrup.", category: "Bakery", rating: "4.5", price: 220, offerPrice: 180, img: img10 },
  // { badge: "Veg", title: "Carrot Cake 🎂", desc: "Spiced carrot cake with cream cheese icing.", category: "Bakery", rating: "4.6", price: 200, offerPrice: 160, img: img11 },
  // { badge: "Veg", title: "Churros with Chocolate 🍫", desc: "Cinnamon-sugar churros with chocolate dip.", category: "Dessert", rating: "4.7", price: 180, offerPrice: 150, img: img12 },
  // { badge: "Veg", title: "Lemon Tart 🍋", desc: "Tangy lemon curd in a buttery crust.", category: "Dessert", rating: "4.6", price: 220, offerPrice: 170, img: img13 },
  // { badge: "Veg", title: "Cinnamon Rolls 🤎", desc: "Warm rolls swirled with cinnamon & sugar.", category: "Bakery", rating: "4.8", price: 190, offerPrice: 150, img: img14 },
  // { badge: "Veg", title: "Baklava 🥮", desc: "Layered pastry with nuts and honey.", category: "Dessert", rating: "4.9", price: 280, offerPrice: 230, img: img15 },
  // { badge: "Veg", title: "Chocolate Croissant 🥐", desc: "Flaky croissant with rich chocolate filling.", category: "Bakery", rating: "4.7", price: 160, offerPrice: 120, img: img16 },
  // { badge: "Veg", title: "Donuts 🍩", desc: "Assorted donuts with various toppings.", category: "Bakery", rating: "4.6", price: 150, offerPrice: 110, img: img17 },
  // { badge: "Veg", title: "Macarons 🇫🇷", desc: "Colorful French macarons.", category: "Bakery", rating: "4.8", price: 300, offerPrice: 250, img: img18 },
  // { badge: "Veg", title: "Fruit Tart 🍇", desc: "Tart topped with fresh fruits and glaze.", category: "Dessert", rating: "4.7", price: 220, offerPrice: 180, img: img19 },
  // { badge: "Veg", title: "Honey Cake 🍯", desc: "Soft cake layered with honey syrup.", category: "Bakery", rating: "4.6", price: 190, offerPrice: 150, img: img20 },
  // { badge: "Veg", title: "Panna Cotta 🍮", desc: "Creamy Italian dessert with berry sauce.", category: "Dessert", rating: "4.8", price: 250, offerPrice: 210, img: img21 },
  // { badge: "Veg", title: "Éclair 🇫🇷", desc: "Choux pastry filled with cream & topped with chocolate.", category: "Bakery", rating: "4.7", price: 220, offerPrice: 180, img: img22 },
  // { badge: "Veg", title: "Vanilla Cupcake 🍦", desc: "Soft vanilla cupcake with buttercream.", category: "Bakery", rating: "4.5", price: 100, offerPrice: 80, img: img23 },
  // { badge: "Veg", title: "Chocolate Fudge Cake 🍫", desc: "Rich chocolate cake with fudge icing.", category: "Dessert", rating: "4.9", price: 280, offerPrice: 230, img: img24 },
  // { badge: "Veg", title: "Molten Chocolate Tart 🍫", desc: "Warm tart with molten chocolate center.", category: "Dessert", rating: "4.8", price: 240, offerPrice: 190, img: img25 },
  // { badge: "Veg", title: "Peach Cobbler 🍑", desc: "Warm peach cobbler with biscuit topping.", category: "Dessert", rating: "4.6", price: 220, offerPrice: 180, img: img26 },
  // { badge: "Veg", title: "Mini Pavlova 🍓", desc: "Meringue dessert topped with fruits.", category: "Dessert", rating: "4.7", price: 200, offerPrice: 160, img: img27 },
  // { badge: "Veg", title: "Opera Cake 🎼", desc: "French cake with coffee and chocolate layers.", category: "Dessert", rating: "4.9", price: 300, offerPrice: 250, img: img28 },
  // { badge: "Veg", title: "Banana Bread 🍌", desc: "Moist banana bread loaf.", category: "Bakery", rating: "4.7", price: 180, offerPrice: 140, img: img29 },
  // { badge: "Veg", title: "Matcha Roll Cake 🍵", desc: "Green tea sponge roll with cream filling.", category: "Bakery", rating: "4.6", price: 250, offerPrice: 200, img: img30 }
];




  return (
    <div className={styles.myMainContainer}>
      <h1 className={styles.title}>Our Special Desserts</h1>
      <div className={styles.myContainer}>
        {desserts.map((item, index) => (
          <PopularFood key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
