import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
