import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import { Carousel } from "flowbite-react";

const Header = () => {
  return (
    <div className="w-full relative">
      <div className="h-64 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={2000}>
          <img
            src={Banner1}
            alt="..."
          />
          <img
            src={Banner2}            
            alt="..."
          />
          <img
            src={Banner3}
            alt="..."
          />
        </Carousel>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4 font-shantell">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center font-shantell">
          Level Up Your Gaming Experience
          <br /> with PlayHive<span className="text-blue-500">!</span>
        </h1>
        <p className="text-sm mt-4 text-center text-yellow-400 bg-[#00000090] px-6 py-4 rounded-full">
          Welcome to PlayHive, where gaming dreams come true!
          <br className="hidden md:block" />
          Immerse yourself in a world of thrilling adventures and epic quests.
        </p>
      </div>
    </div>
  );
};

export default Header;
