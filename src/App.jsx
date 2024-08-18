import { Fragment } from "react"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import Watchlist from "./Components/Watchlist"
import { Routes,Route } from "react-router-dom"
import './App.css'
import WatchListContextWrapper from "./Context/WathclistContext"
import { Provider } from "react-redux";
import store from "./redux/store"

function App() {
 

  return (
    <Provider store={store}>
    <Fragment>
      <Navbar/>
     <WatchListContextWrapper>
    <Routes>
      <Route path='/' element = {<Home></Home>}/>
      <Route path='/watchlist' element = {<Watchlist></Watchlist>}/>
    </Routes>
    </WatchListContextWrapper>
    </Fragment>
    </Provider>
   )
}

export default App



