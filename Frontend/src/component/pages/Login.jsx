import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Login() {
   const navigate = useNavigate()
   const [validated, setValidated] = useState(false);

   function goToRegister(){
    navigate('/')
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setValidated(true);

    if (!form.checkValidity()) {
      return;
    }

    console.log("Form is valid!");
    navigate('/Profile')
  }
  return (
    <>
       <div className="container p-3">
      <div className="section p-3 row flex-row-reverse">

        <div className="bg-primary col-md-5 d-flex  justify-content-center align-items-center rounded-end-5">
          <div className="inner">
            <h2 className="text-white">Welcome to login</h2>
            <p className="text-white-50 text-center">
              Don't have account
            </p>
            <button className="btn btn-outline-light w-100" onClick={goToRegister}>
              Sign up
            </button>
          </div>
        </div>

        <div className="col-md-7 bg-white rounded-start-5">

          <form
            className={`row g-3 needs-validation p-5 ${
              validated ? "was-validated" : ""
            }`}
            noValidate
            onSubmit={handleSubmit}
          >

            <h4 className="text-center m-2">
              Login Account
            </h4>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">
                University Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                pattern="[^@\s]+@std\.sci\.cu\.edu\.eg"
                placeholder="name@std.sci.cu.edu.eg"
              />
              <div className="invalid-feedback">
                Please use your university email (@std.sci.cu.edu.eg).
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                minLength={8}
              />
              <div className="invalid-feedback">
                Password must be at least 8 characters.
              </div>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Sign In
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
    </>
  )
}
