import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Courses({ context }) {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  /** if fetch courses fail navigate user to /error */
  useEffect(() => {
    context.data.getCourses()
    .then((res) => {
      if (res === 500) {
        navigate('/error');
      } else {
        setCourses(res);
      }
    });
  }, []);

  return (
    <>
      <div className="wrap main--grid">
        {courses.map((course) => {
          return (
            <Link
              key={course.id}
              className="course--module course--link"
              to={`/courses/${course.id}`}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          );
        })}
        <a
          className="course--module course--add--module"
          href="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </a>
      </div>
    </>
  );
}
