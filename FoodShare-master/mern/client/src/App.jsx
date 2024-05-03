import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import WhatWeDo from './Components/Home/WhatWeDo';
import Info from './Components/Home/info';
import SponsorLogo from './Components/Home/sponsorLogo';
import Footer from './Components/Footer/footer';
import Dashboard from './Components/DashBoard/Dashboard/dashboard';
import Login from "./Components/Login&Register/login";
import Register from "./Components/Login&Register/register"
import PersonalInfo from "./Components/Personal_Info/personal_Info";
import RequestListing from "./Components/DashBoard/Donations/RequestListing";
import Analytics from './Components/DashBoard/Profile/Analytics';
import About from './Components/About/about';
import GetInTouch from "./Components/GetInTouch/GetInTouch";
import GoogleMaps from './Components/DashBoard/Dashboard/GoogleMaps';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header id="header" />
              <WhatWeDo id="whatwedo" />
              <Info />
              <SponsorLogo id="sponsors" />
              <Footer />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personal-info" element={<PersonalInfo />} />

        <Route path="/new-request" element={<RequestListing />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/map" element={<GoogleMaps />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<GetInTouch />} />


      </Routes>
    </Router>
  );
}

export default App;