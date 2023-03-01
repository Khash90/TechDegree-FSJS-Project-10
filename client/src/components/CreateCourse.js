import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEtimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  

  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEtimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
// create course body
   const body = {
     userId: context.authenticatedUser.id,
     title,
     description,
     estimatedTime,
     materialsNeeded,
   };
   await context.data
     .createCourse(
       body,
       context.authenticatedUser.emailAddress,
       context.authenticatedUser.password
     )
     .then((errors) => {
       // set errors from response
       if (errors.length) {
         setErrors(errors);
       } else {
         navigate("/");
       }
     })
     .catch((err) => {
       console.error(err);
       navigate("/"); // return to home
     });
 };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={handleChange}
              />

              <p>
                By {context.authenticatedUser.firstName}{" "}
                {context.authenticatedUser.lastName}{" "}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            {" "}
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;