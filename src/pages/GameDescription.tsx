import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../types";
import { RAPID_API_HOST, RAPID_API_KEY, BASE_URL } from "../utils/constants";


const GameDescription = () => {
    const [game, setGame] = useState<Game>();
    const { id } = useParams<{ id: string }>();
    const options = {
        method: 'GET',
        url: `${BASE_URL}/game?id=${id}`,
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_API_HOST
        }
    };

    useEffect(() => {
        axios.request(options)
            .then(function (response) {
                setGame(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])
   

    return (
        <div className="flex flex-col items-center justify-center text-white dark:bg-slate-800 bg-gray-100">
            {game && (
                <div className="max-w-7xl overflow-hidden bg-white dark:bg-slate-800">
                    <img src={game.thumbnail} alt={game.title} className="w-full h-96 object-cover" />
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">{game.title}</h2>
                        <p className="text-sm text-gray-400 mb-4">{game.short_description}</p>
                        <div className="flex justify-between mb-4">
                            <p className="text-sm text-gray-400">Genre : {game.genre}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">{game.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-xs uppercase text-gray-600">Publisher</p>
                                <p>{game.publisher}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-600">Developer</p>
                                <p>{game.developer}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500">Platform</p>
                                <p>{game.platform}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500">Release Date</p>
                                <p>{game.release_date}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {game.screenshots.map((screenshot) => (
                                <img key={screenshot.id} src={screenshot.image} alt={`Screenshot ${screenshot.id}`} className="w-full h-48 object-cover rounded-lg" />
                            ))}
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-2">Minimum System Requirements:</h3>
                            <ul className="text-sm text-gray-400">
                                <li>OS: {game.minimum_system_requirements.os}</li>
                                <li>Processor: {game.minimum_system_requirements.processor}</li>
                                <li>Memory: {game.minimum_system_requirements.memory}</li>
                                <li>Graphics: {game.minimum_system_requirements.graphics}</li>
                                <li>Storage: {game.minimum_system_requirements.storage}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameDescription;
