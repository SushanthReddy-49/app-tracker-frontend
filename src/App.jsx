import JobBoard from "./components/JobBoard";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddJob from "./components/AddJob";
import {JobProvider} from "./context/JobContext";

function App() {
  return (
    <JobProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobBoard />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </JobProvider>
  );
}

export default App;
