import Navbar from "./components/Navbar"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import GameDescription from "./pages/GameDescription"
import { Flowbite } from "flowbite-react"

function App() {

  return (
    <Flowbite>
      <Navbar />
      <BrowserRouter>
       <Routes>
         <Route path="/"element={<Home />} />
         <Route path="/game/:id"element={<GameDescription />} />
       </Routes>
      </BrowserRouter>
      <Footer />
    </Flowbite>
  )
}

export default App
