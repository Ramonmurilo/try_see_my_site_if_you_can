import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page'
import Login from './pages/login'

function AllRoutes() {
  return (
    <Router basename="/try_see_my_site_if_you_can">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export {
    LandingPage,
    Login,
    AllRoutes
}
