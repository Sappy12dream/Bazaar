import "./Global/Styles.scss";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { useEffect } from "react";
import store from "./Redux/store";
import { loadUser } from "./Redux/ActionCreater/UserAction";
import { loadArtist } from "./Redux/ActionCreater/ArtistAction";


function App() {
  useEffect(() => {
    store.dispatch(loadUser())

    store.dispatch(loadArtist())
  }, [])
    

return (
    <div className="App">
      <Navbar />
      <Home /> 
    </div>
  );
}

export default App;
