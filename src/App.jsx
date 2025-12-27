import SetupProfile from './components/SetupProfile/SetupProfile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetupProfile />} />
      <Route path="/profile" element={<SetupProfile />} />
    </Routes>
  )
}

export default App;

