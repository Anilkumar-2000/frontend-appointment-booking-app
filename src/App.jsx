import { Routes, Route } from "react-router-dom";
import { doctorTabs, doctorsList } from "./data/doctorsData";

import Home from "./components/Home";
import DoctorProfileDetail from "./components/DoctorProfileDetail";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home doctorsList={doctorsList} doctorTabs={doctorTabs} />}
          />
          <Route
            path="/doctor-profile-detail/:id"
            element={<DoctorProfileDetail />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
