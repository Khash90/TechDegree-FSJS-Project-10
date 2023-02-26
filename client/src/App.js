import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Courses from "./components/Courses";
import Header from "./components/Header";
import withContext from "./Context";

const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);

const App = () => {
  return (
    <Router>

      <HeaderWithContext />
      <main>
        {
          <Routes>
              <Route path="/" element={<CoursesWithContext />} />
          </Routes>
        }
      </main>

    </Router>
  )
}

export default App;