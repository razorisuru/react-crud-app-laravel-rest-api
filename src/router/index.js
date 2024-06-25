import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Students from "../pages/Students";
import StudentAdd from "../pages/StudentAdd";

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/students" element={<Students/>} />
      <Route path="/students/add" element={<StudentAdd/>} />
    </Routes>
  );
}

export default MyRouter;
