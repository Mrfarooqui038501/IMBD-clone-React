import { Fragment } from "react"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import Watchlist from "./Components/Watchlist"
import { Routes,Route } from "react-router-dom"
import './App.css'

function App() {
 

  return (
    <Fragment>
      <Navbar/>

    <Routes>
      <Route path='/' element = {<Home></Home>}/>
      <Route path='/watchlist' element = {<Watchlist></Watchlist>}/>
    </Routes>

    </Fragment>
   )
}

export default App



