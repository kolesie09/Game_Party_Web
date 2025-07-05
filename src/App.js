import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/noMatch/NoMatch";
import Familiada from "./pages/game/Familiada";
import SettingsFamiliada from "./pages/settings/familiada/SettingsFamiliada";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/game/Familiada" element={<Familiada />} />
        <Route
          path="/settings/familiada/SettingsFamiliada"
          element={<SettingsFamiliada />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
