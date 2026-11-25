import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/Login");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setValidated(true);

    if (!form.checkValidity()) {
      return;
    }

    console.log("Form is valid!");
    navigate("/Profile");
  }

  return (
    <div className="container p-3">
      <div className="section p-3 row">
        <div className="bg-primary col-md-5 d-flex justify-content-center align-items-center rounded-start-5">
          <div className="inner">
            <h2 className="text-white">Get Started</h2>
            <p className="text-white-50">Already have account?</p>
            <button className="btn btn-outline-light w-100" onClick={goToLogin}>
              Log in
            </button>
          </div>
        </div>

        <div className="col-md-7 bg-white rounded-end-5">
          <form
            className={`row g-3 needs-validation p-5 ${
              validated ? "was-validated" : ""
            }`}
            noValidate
            onSubmit={handleSubmit}
          >
            <h4 className="text-center m-2">Register Account</h4>

            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>

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
              <button className="btn btn-primary w-100" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
