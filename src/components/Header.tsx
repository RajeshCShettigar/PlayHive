import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import { Carousel } from "flowbite-react";

const Header = () => {
  return (
    <div className="w-full relative">
      <div className="h-64 sm:h-64 md:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <Carousel slideInterval={2000}>
          <img
            src={Banner1}
            alt="..."
            className="w-full h-full object-cover object-center"
          />
          <img
            src={Banner2}
            alt="..."
            className="w-full h-full object-cover object-center"
          />
          <img
            src={Banner3}
            alt="..."
            className="w-full h-full object-cover object-center"
          />
        </Carousel>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center pt-24 md:pt-28 lg:pt-24 xl:pt-20 2xl:pt-16 px-4 font-shantell">
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold text-center font-shantell">
          Level Up Your Gaming Experience
          <br /> with PlayHive<span className="text-blue-500">!</span>
        </h1>
        <p className="text-sm mt-2 text-center text-yellow-400 bg-[#00000090] px-4 py-2 rounded-full md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          Welcome to PlayHive, where gaming dreams come true!
          <br className="hidden md:block" />
          Immerse yourself in a world of thrilling adventures and epic quests.
        </p>
      </div>
    </div>
  );
};

export default Header;
