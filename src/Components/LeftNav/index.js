import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./Nav.css";
const LeftNav = () => {
  const [open1, setOpen1] = useState(true);
  const openarrow1 = () => {
    setOpen1(!open1);
  };
  return (
    <>
      <div className="nav_container">
        <div className="nav_title">
          <MdDashboard /> Dashboard
        </div>

        <button
          onClick={openarrow1}
          className={open1 ? `accordion-act` : `accordion`}
        >
          Modules{" "}
          <BsChevronDown className={open1 ? `arrow-rotate` : "arrow-margin"} />
        </button>
        <div
          style={
            open1
              ? { display: "block", transition: "display  1s" }
              : { display: "none" }
          }
        >
          <ul>
            <li>
              <NavLink to="/product">Products</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftNav;
