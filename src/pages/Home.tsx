import { useState, useEffect } from "react";
import { Game } from "../types/index";
import GameCard from "../components/GameCard";
import axios from "axios";
import { RAPID_API_HOST, RAPID_API_KEY, BASE_URL } from "../utils/constants";
import { Pagination } from 'flowbite-react';

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
  const gamesPerPage = 12;

  //fetch data from api
  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setGames(response.data);
        //console.log(response.data);
       // console.log(games.length);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, []);
 
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white dark:bg-gray-800">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {currentGames.length > 0 ? (
          currentGames.map((game: Game) => (
            <li key={game.id}>
              <GameCard content={game} />
            </li>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center dark:bg-dark-gradient p-4 text-white">
            <div className="mx-auto justify-center">
              <h1 className="text-4xl dark:text-gray-400 text-center py-56">No games to display</h1>
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
