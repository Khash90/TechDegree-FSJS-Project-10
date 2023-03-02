import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Courses from "./components/Courses";
import Header from "./components/Header";
import withContext from "./Context";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";

const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);


const App = () => {
  return (
    <Router>
      <HeaderWithContext />
      <main>
        {
          <Routes>
            {/*  Navigates to the course creation page - Route is private and requires authentication. */}

            <Route element={<PrivateRoute />}>
              <Route
                path="/courses/create"
                element={<CreateCourseWithContext />}
              />

            </Route>

            <Route path="/" element={<CoursesWithContext />} />

            <Route path="/courses/:id" element={<CourseDetailWithContext />} />

            <Route path="/signup" element={<UserSignUpWithContext />} />

            <Route path="/signin" element={<UserSignInWithContext />} />

            <Route path="/signout" element={<UserSignOutWithContext />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/notfound" element={<NotFound/>} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/error"  element={<UnhandledError />} />

          </Routes>
        }
      </main>
    </Router>
  );
};

export default App;
