import { useState, useEffect,ChangeEvent } from "react";
import { Game } from "../types/index";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import axios from "axios";
import {
  RAPID_API_HOST,
  RAPID_API_KEY,
  BASE_URL,
  SORT_BY,
  GENRES,
  PLATFORMS,
  TAGS,
} from "../utils/constants";
import { Pagination } from "flowbite-react";

const options = {
  method: "GET",
  url: `${BASE_URL}/games`,
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
};

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const gamesPerPage = 12;

  //fetch data from api
  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setGames(response.data);
        setFilteredGames(response.data);
        //console.log(response.data);
        // console.log(games.length);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, []);

  //filtering
  const onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;

    if (name === "platform" || name === "genre" || name === "tag" || name === "sortBy") {
      let filteredGamesCopy = [...games]; // Create a copy of the games array

      if (name === "sortBy") {
        filteredGamesCopy = filteredGamesCopy.sort((a, b) =>
          value === "asc"
            ? a[value as keyof Game] > b[value as keyof Game]
              ? 1
              : -1
            : b[value as keyof Game] > a[value as keyof Game]
            ? 1
            : -1
        );
      } else {
        filteredGamesCopy = filteredGamesCopy.filter(
          (game) => game[name as keyof Game] === value
        );
      }

      setFilteredGames(filteredGamesCopy);
    }
  };

  //reset filter
  const resetFilters = () => {
    setFilteredGames(games); // Reset filtered games to the initial state (all games)
    setCurrentPage(1); // Reset pagination to the first page
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames =filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 
  
  return (
    <div className="flex flex-col items-center justify-center text-white dark:bg-gray-800">
      <Header />
     <div className="flex flex-row flex-wrap justify-between border-1 shadow-md dark:bg-gray-800 border-gray-400 w-full">
      <form
        onChange={onChange}
        className="flex justify-between max-w-542px px-4 mx-auto text-secondaryTextColor box-border my-2 text-gray-300"
      >
        <h1 className="text-2xl mr-8 my-auto">Filter games</h1>
        <label
          htmlFor="platform-select"
          className="inline-block mr-4 flex-basis-25%"
        >
          Platform:
          <select
            name="platform"
            id="platform-select"
            value="Platform"
            className="w-full mt-2 bg-gray-700"
          >
            {PLATFORMS.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.display}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="genre-select"
          className="inline-block mr-4 flex-basis-25%"
        >
          Genre:
          <select
            name="genre"
            id="genre-select"
            className="w-full mt-2 bg-gray-700"
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.display}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="tag-select"
          className="inline-block mr-4 flex-basis-25%"
        >
          Tag:
          <select
            name="tag"
            id="tag-select"
            className="w-full mt-2 bg-gray-700"
          >
            <option value="">All Tags</option>
            {TAGS.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.display}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="sortBy-select" className="inline-block flex-basis-25%">
          Sort By:
          <select
            name="sortBy"
            id="sortBy-select"
            className="w-full mt-2 bg-gray-700"
          >
            {SORT_BY.map((sortBy) => (
              <option key={sortBy.value} value={sortBy.value}>
                {sortBy.display}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={resetFilters}
          className="bg-pink-500 text-white px-4 rounded-md shadow-md hover:bg-gray-700 border-1 border-gray-400 my-3 mx-3"
        >
          Reset Filters
        </button>
      </form>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {currentGames.length > 0 ? (
          currentGames.map((game: Game) => (
            <li key={game.id} className="border-4 border-transparent ">
              <GameCard content={game} />
            </li>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center dark:bg-dark-gradient p-4 text-white">
            <div className="mx-auto justify-center">
              <h1 className="text-4xl dark:text-gray-400 text-center py-56">
                No games to display
              </h1>
            </div>
          </div>
        )}
      </ul>
      <div className="flex justify-center my-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={1000}
          onPageChange={paginate}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      </div>
    </div>
  );
};

export default Home;
