import "./Global/Styles.scss";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { useEffect, useState } from "react";
import store from "./Redux/store";
import { loadUser } from "./Redux/ActionCreater/UserAction";
import { loadArtist } from "./Redux/ActionCreater/ArtistAction";


function App() {
  const [menuActive, setmenuActive] = useState(false)
  useEffect(() => {
    store.dispatch(loadUser())

    store.dispatch(loadArtist())
  }, [])
    

return (
    <div className="App">
      <Navbar menuActive={menuActive} setmenuActive={setmenuActive}/>
      <Home setmenuActive={setmenuActive} /> 
    </div>
  );
}

export default App;
