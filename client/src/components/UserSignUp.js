import React, {useRef,useState} from "react"; 
import {  useNavigate , NavLink } from "react-router-dom";


export default function UserSignUp({ context }) {
    const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    //create an object of user
    const user = {
      firstName:firstName.current.value,
      lastName:lastName.current.value,
      emailAddress:emailAddress.current.value,
      password:password.current.value
    }

    context.data.createUser(user)
    .then((errors) => {
      if (errors.length) {
        setErrors(errors)
      } else {
        context.actions.signIn(emailAddress.current.value, password.current.value).then(() => {
          navigate('/')
        })
      }
    }).catch((err) => console.log(err))
  }

  const handleCancel = () => {
    navigate('/')
  }

    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
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
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            ref={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            ref={lastName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            ref={password}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </form>
        <p>
          {" "}
          Already have a user account? Click here to{" "}
          <NavLink to="/signin">sign in</NavLink>!
        </p>
      </div>
    );
};

