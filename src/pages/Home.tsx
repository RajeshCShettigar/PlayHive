import { useState, useEffect, ChangeEvent } from "react";
import { Game } from "../types/index";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import axios from "axios";
import { RAPID_API_HOST,RAPID_API_KEY,BASE_URL,SORT_BY,GENRES,PLATFORMS} from "../utils/constants";
import { Pagination } from "flowbite-react";
import { theme } from "flowbite-react";

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const gamesPerPage = 12;
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");


  //fetch data from api
  const fetchGames=async(params:string)=>{
    try{
      const response=await axios.request({
        method:"GET",
        url:`${BASE_URL}${params}`,
        headers:{
          "X-RapidAPI-Key":RAPID_API_KEY,
          "X-RapidAPI-Host":RAPID_API_HOST,
        },
      })
      setGames(response.data);
      setFilteredGames(response.data);
      console.log(games);
    }
    catch(err:any){
      setError(err.message);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchGames("/games");
  }, []);


  //filtering
  const onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    
    console.log(name,value);
    // Filter by platform
    if (name === "platform") {
       if(value===""){
          fetchGames("/games");
        }
        else{
          fetchGames(`/games?platform=${value}`);
        }
      }
    // Filter by genre
    if (name === "genre") {
      if(value===""){
        fetchGames("/games");
      }
      else{
        fetchGames(`/games?category=${value}`);
      }
    }
    // Sort by
    if (name === "sortBy") {
      if(value===""){
        fetchGames("/games");
      }
      else{
        fetchGames(`/games?sort-by=${value}`);
      }
    }
      setCurrentPage(1); 
  };

  //reset filter
  const resetFilters = (e:any) => {
    e.preventDefault();
    fetchGames("/games");// Reset filtered games to the initial state (all games)
    setCurrentPage(1); // Reset pagination to the first page
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 
  return (
    <div className="flex flex-col items-center justify-center text-white bg-gray-900">
      <Header />
      <div className="flex flex-row flex-wrap justify-between border-y-2 shadow-md border-gray-400 w-full">
        <form
          onChange={onChange}
          className="flex flex-col sm:flex-row justify-between max-w-542px px-4 mx-auto box-border my-2 text-gray-300"
        >
          <h1 className="text-2xl mr-8 my-auto w-full sm:w-auto">
            Filter games
          </h1>
          <div className="flex flex-col sm:flex-row sm:inline-block w-full sm:w-auto sm:flex-basis-25% mb-2 sm:mb-0">
            <label htmlFor="platform-select" className="inline-block mr-4">
              Platform:
            </label>
            <select
              name="platform"
              id="platform-select"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full mt-2 bg-gray-700"
            >
              {PLATFORMS.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.display}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:inline-block w-full sm:w-auto sm:flex-basis-25% mb-2 sm:mb-0">
            <label htmlFor="genre-select" className="inline-block mr-4">
              Genre:{" "}
            </label>
            <select
              name="genre"
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full mt-2 bg-gray-700"
            >
              <option value="">All Genres</option>
              {GENRES.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.display}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:inline-block w-full sm:w-auto sm:flex-basis-25% mb-2 sm:mb-0">
            <label htmlFor="sortBy-select" className="inline-block">
              Sort By:{" "}
            </label>
            <select
              name="sortBy"
              id="sortBy-select"
              value={selectedSortBy}
              onChange={(e) => setSelectedSortBy(e.target.value)}
              className="w-full mt-2 bg-gray-700"
            >
              {SORT_BY.map((sortBy) => (
                <option key={sortBy.value} value={sortBy.value}>
                  {sortBy.display}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={(e) => resetFilters(e)}
            className="bg-pink-500 text-white px-4 rounded-md shadow-md hover:bg-gray-700 border-1 border-gray-400 mx-3 mt-3"
          >
            Reset Filters
          </button>
        </form>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {currentGames.length > 0
          ? currentGames.map((game: Game) => (
              <li key={game.id} className="border-2 border-gray-400">
                <GameCard content={game} />
              </li>
            ))
          : null}
      </ul>

      {currentGames.length === 0 && (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4 text-white">
          <div className="mx-auto justify-center">
            <h1 className="text-4xl text-gray-400 text-center py-56">
              No games to display
            </h1>
          </div>
        </div>
      )}
      <div className="flex justify-center my-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={1000}
          onPageChange={paginate}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons={true}
          className="bg-gray-900"
        />
      </div>
    </div>
  );
};

export default Home;
