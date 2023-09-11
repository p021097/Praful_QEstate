import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Explore from "./Components/Explore/Explore";
import ListingDetailPage from "./Components/LIstingDetailPage/ListingDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listings" element={<Explore />} />
        <Route path="/detail/:property_id" element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
