import React from "react";
import { NavLink } from "react-router-dom";
import { filterData } from "../Info/Item";
import { useContext } from "react";
import { APIContext } from "../context/Context";

const SubNavbar = () => {
  const getUsr = useContext(APIContext);
  const handleClick = async (e) => {
    const data = e.target.getAttribute("data-name");
    const res = await filterData(data);
    return getUsr.setUserData(res);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl-3 m-1 sticky-top">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to={"#"}
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filter Data
              </NavLink>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <div>
                  <label
                    className="form-label ml-2 cLabel"
                    data-name="release_date"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Release date
                  </label>
                </div>
                <div>
                  <label
                    className="form-label ml-2 cLabel"
                    data-name="brand"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Brand
                  </label>
                </div>
                <div>
                  <label
                    className="form-label ml-2 cLabel"
                    data-name="model"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Model
                  </label>
                </div>
                <div>
                  <label
                    className="form-label ml-2 cLabel"
                    data-name="os"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    OS
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SubNavbar;
