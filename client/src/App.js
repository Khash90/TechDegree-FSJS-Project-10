import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Courses from "./components/Courses";
import Header from "./components/Header";
import withContext from "./Context";
import CourseDetail from "./components/CourseDetail";

const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);

const App = () => {
  return (
    <Router>

      <HeaderWithContext />
      <main>
        {
          <Routes>
              <Route path="/" element={<CoursesWithContext />} />
              <Route path="/courses/:id" element={<CourseDetailWithContext />} />
          </Routes>
        }
      </main>

    </Router>
  )
}

export default App;