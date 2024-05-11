import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
    const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: false ,
    password: false
  })
  const [success, setSuccess] = useState(false)

  const handelSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['email', 'password', ];
        let hasError = false;
        const newErrors = {};
        requiredFields.forEach(field => {
          if (!loginForm[field]) {
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

    try {
   const response =  await axios.post(
        "https://e-commerce-nestjs-1ad58a9d5c9f.herokuapp.com/users/login", loginForm, );
      console.log("User login successfully!")
      console.log(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));

      setLoginForm({
        email: "",
        password: "",
      })
      setSuccess(true)
      navigate('/')

    } catch (error) {
      console.error(error);
    }
  };

 const handelChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
    setLoginForm((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div>
      <div className="form-container sign-in-container">
        <form onSubmit={handelSubmit}>
          <h1>Sign in</h1>
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
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handelChange}
            name="email"
            style={{ border: errors.email ? "1px solid red" : "none" }}

          />
          {errors.email && <p className="error">Please enter your email</p>}
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handelChange}
            name="password"
            style={{ border: errors.password ? "1px solid red" : "none" }}

          />
          {errors.password && <p className="error">Please enter your password</p>}
          <a href="#">Forgot your password?</a>
          {success && <p className="success">success Login</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>

            <button className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
