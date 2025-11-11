import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupFlip from "./LoginSignupFlip";
import ForgotPassword from "./ForgotPassword";
import Auth from"./Auth";
import "./1.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignupFlip />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="*" element={<LoginSignupFlip />} />
      </Routes>
    </Router>
  );
}

export default App;
