import React, { useState, useEffect } from "react";
import Login from "./Login";
import axios from "axios";
function Register() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    type: false,
  });
  const [success, setSuccess] = useState(false)
  useEffect(() =>{
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  })
       
       const  submit = async (e) => {
        e.preventDefault();

        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'type'];
        let hasError = false;
        const newErrors = {};
        requiredFields.forEach(field => {
          if (!formData[field]) {
            newErrors[field] = true;
            hasError = true;
          } else {
            newErrors[field] = false;
          }
        });
    
        setErrors(newErrors);
    
        if (hasError) {
          return;
        }
        
        try{
          await axios.post("https://e-commerce-nestjs-1ad58a9d5c9f.herokuapp.com/users", formData)
          console.log('User registered successfully!');

          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            type: "",
          })
          setSuccess(true)
        } catch (error) {
          console.error('Error registering user:', error.message);
        }
        // navigate('/login')
  };
  
  const handelChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="mainRegister">
      
      <h2>Welcome my friend</h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">

          <form onSubmit={submit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              onChange={handelChange}
              name="firstName"
              type="text"
              placeholder="First Name..."
              value={formData.firstName}
            style={{ border: errors.firstName ? "1px solid red" : "none" }}
            />
            {errors.firstName && <p className="error">Please enter your first name</p>}
            <input
              onChange={handelChange}
              name="lastName"
              type="text"
              placeholder="Last Name..."
              value={formData.lastName}
              style={{ border: errors.lastName ? "1px solid red" : "none" }}

            />
            {errors.lastName && <p className="error">Please enter your last name</p>}

            <input
              onChange={handelChange}
              name="email"
              type="email"
              placeholder="email..."
              value={formData.email}
              style={{ border: errors.email ? "1px solid red" : "none" }}

            />
            {errors.email && <p className="error">Please enter your email</p>}

            <input
              onChange={handelChange}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formData.password}
              style={{ border: errors.password ? "1px solid red" : "none" }}

            />
            {errors.password && <p className="error">Please enter your password</p>}

            <select
            
              onChange={handelChange}
              name="type"
              value={formData.type}
              style={{ border: errors.type ? "1px solid red" : "none" }}

            >
               <option value="">Select Type</option>
              <option value="seller">seller</option>
              <option value="buyer">buyer</option>
              
            </select>
            {errors.type && <p className="error">Please enter Your Type </p>}
            {success && <p className="success">register Success</p>}
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <Login />
      </div>  

    </div>
  );
}

export default Register;
