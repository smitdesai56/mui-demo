import "./App.scss";
import { Routes, Route } from "react-router";
import { LoginForm } from "./pages/Login/LoginForm";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
