
import HeroGap from "./HeroGap";
import HeroOne from "./HeroOne";
import HeroTwo from "./HeroTwo";
import PopularFoods from "./PopularFoods";


const MainHero = () => {
  return (
    <div>
      <HeroOne />
      <HeroGap />
      <HeroTwo />
      <HeroGap />
      <PopularFoods />
      <HeroGap />
    </div>
  );
};

export default MainHero;
