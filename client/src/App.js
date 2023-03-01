import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Courses from "./components/Courses";
import Header from "./components/Header";
import withContext from "./Context";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";



const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


const App = () => {
  return (
    <Router>

      <HeaderWithContext />
      <main>
        {
          <Routes>

              <Route path="/" element={<CoursesWithContext />} />
              <Route path="/courses/:id" element={<CourseDetailWithContext />} />
              <Route path="/signup" element={<UserSignUpWithContext />} />
              <Route path="/signin" element={<UserSignInWithContext />} />
              <Route path="/signout" element={<UserSignOutWithContext />} />              

          </Routes>
        }
      </main>

    </Router>
  )
}

export default App;