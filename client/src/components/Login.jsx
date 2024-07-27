import React from "react";
import { Form, NavLink, redirect } from "react-router-dom";
import { verify } from "../Info/login";

export async function action({ request }) {
  const formData = await request.formData();
  const uploadData = Object.fromEntries(formData);
  const res = await verify(uploadData);
  if (res) {
    return redirect(`/user/${uploadData.UserName}`);
  } else {
    alert("Invalid Credentials");
    return redirect(`/login`);
  }
}

const Login = () => {
  return (
    <>
      <div
        className="card"
        style={{
          margin: "auto",
          marginleft: "35%",
          width: "31%",
          alignitems: "center",
          marginTop: "25px",
        }}
      >
        <Form method="post">
          <div className="card-body" style={{ height: "auto" }}>
          <h5 className="card-title">Login</h5>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                User Name
              </label>
              <input
                type="name"
                className="form-control"
                id="UserName"
                aria-describedby="emailHelp"
                name="UserName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Password"
                name="Password"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember Me
              </label>
            </div>
            <div>
              <label>Do not have an Account?</label>&nbsp;
              <NavLink to={"/signup"}>Sign up</NavLink>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
