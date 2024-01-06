import { Link } from "react-router-dom";
import { Game } from "../types/index";
import { BROWSER, WINDOWS } from "../utils/constants";
import windowsIcon from "../assets/windows.svg";
import browserIcon from "../assets/browser.svg";

interface Props {
  content: Game;
}

const GameCard = ({ content }: Props) => {
  const { id, title, thumbnail, short_description, genre, platform } = content;

  const link = `/game/${id}`;
  
  const icons = platform.split(",").map((p) => {
    let icon = null;
    switch (p.trim()) {
      case BROWSER:
        icon = (
          <img
            key={`${id}-browser`}
            alt="browser icon"
            src={browserIcon}
            className="w-8 h-8 mr-8"
          />
        );
        break;
      case WINDOWS:
        icon = (
          <img
            key={`${id}-windows`}
            alt="windows icon"
            src={windowsIcon}
            className="w-8 h-8 mr-8"
          />
        );
        break;
      default:
        break;
    }
    return icon;
  });

  return (
    <Link to={link}>
      <div className="max-w-sm overflow-hidden h-full hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg flex flex-col justify-between">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-3 py-2">
            {title}
          </h5>
        <div className="flex flex-col px-3 py-2">
          <p className="text-sm text-gray-700 dark:text-gray-400 font-shantell">
            {short_description}
          </p>
          <div className="flex flex-row items-center justify-between mt-auto py-2">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {genre}
            </p>
            <p>{icons}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
