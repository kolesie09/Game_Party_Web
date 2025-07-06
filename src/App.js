import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/noMatch/NoMatch";
import Familiada from "./pages/game/Familiada";
import SettingsFamiliada from "./pages/settings/familiada/SettingsFamiliada";
import AddQuestionFamiliada from "./pages/settings/familiada/AddQuestion";
import Milionerzy from "./pages/game/Milionerzy";
import SettingsMilionerzy from "./pages/settings/milionerzy/SettingsMilionerzy";
import AddQuestionMilionerzy from "./pages/settings/milionerzy/AddQuestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route
          path="/settings/milionerzy/SettingsMilionerzy"
          element={<SettingsMilionerzy />}
        />
        <Route
          path="/settings/milionerzy/AddQuestion"
          element={<AddQuestionMilionerzy />}
        />
        <Route
          path="/settings/familiada/AddQuestion"
          element={<AddQuestionFamiliada />}
        />
        <Route path="/game/Milionerzy" element={<Milionerzy />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
