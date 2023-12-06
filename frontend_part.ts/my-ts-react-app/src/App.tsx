import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home-page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Schedule from "./components/Schedule/Schedule";
import Courses from "./components/Courses/Courses";
import Gradebook from "./components/Gradebook/Gradebook";
import Performance from "./components/Performance/Performance";
import Announcement from "./components/Announcement/Announcement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}/>
        <Route path="/schedule" element={<RequireAuth><Schedule/></RequireAuth>}/>
        <Route path="/courses" element={<RequireAuth><Courses/></RequireAuth>}/>
        <Route path="/gradebook" element={<RequireAuth><Gradebook/></RequireAuth>}/>
        <Route path="/performance" element={<RequireAuth><Performance/></RequireAuth>}/>
        <Route path="/announcement" element={<RequireAuth><Announcement/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
