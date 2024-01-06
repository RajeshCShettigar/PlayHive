import { DarkThemeToggle } from "flowbite-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 py-4 px-6 shadow-lg border-b dark:border-gray-700">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold font-rubik bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent ">
          <a href="/"><i>Play Hive</i></a>
        </h1>
      </div>
      <div className="flex items-center">
        <DarkThemeToggle className="border-0"/>
      </div>
    </div>
  )
}

export default Navbar;