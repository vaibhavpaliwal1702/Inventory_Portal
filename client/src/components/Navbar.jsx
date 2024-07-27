import React from "react";
import { NavLink,redirect,useNavigate } from "react-router-dom";
import { logout } from "../Info/login";
import { useContext } from "react";
import { userContext } from "../context/Context";


const Navbar = () => {
    const data = useContext(userContext);
    const navigate = useNavigate();
    const HandleLogout = async () => {
        await logout();
        return navigate("/");
    }
    const handleOnClick=()=>{
      navigate(`/AddProduct`)
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand">Example</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link active" aria-current="page">
                Home
              </NavLink>
              <NavLink className="nav-link">Features</NavLink>
              {data ? (
                <>
                    <NavLink className="nav-link" to={`/user/${data.UserName}`}>
                        {data.UserName.toUpperCase()}&nbsp;
                        <img src={data.avatar} style={{width:"30px", height:"30px", borderRadius:"20px"}} className="img"/>
                    </NavLink>
                    <NavLink className="nav-link" onClick={HandleLogout}>Logout</NavLink>
                </>
              ) : (
                <NavLink className="nav-link" to={"/login"}>
                  Login
                </NavLink>
              )}
              <button className="btn btn-primary justify-content-end" onClick={handleOnClick}>Add Product</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
