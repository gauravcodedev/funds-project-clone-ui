import SetupProfile from './components/SetupProfile/SetupProfile';
import LoginPage from './components/pages/Login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<SetupProfile />} />
    </Routes>
  )
}

export default App;

