import "./App.scss";
import { Routes, Route } from "react-router";
import { LoginForm } from "./pages/Login/LoginForm";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ShowUser } from "./pages/ShowUser/ShowUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/show" element={<ShowUser />} />
      </Routes>
    </div>
  );
}

export default App;
