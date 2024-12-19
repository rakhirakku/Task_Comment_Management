import React from "react";
import { CiCirclePlus } from "react-icons/ci";
// import ListIcon from '../../Filter.png';
import { NavLink } from "react-router-dom";
import "./Header.scss";
import FilterForm from "../../Pages/Home/FilterForm"; // Import FilterForm for filtering tasks

export const HeaderFilterForm = () => {
  return (
    <>
      {/* Main header row */}
      <div className="row top-header ">
        
        {/* Left section with List Icon button */}
        {/* <div className="col-12 col-md-1">
          <button className="btn-list btn">
            <img src={ListIcon} alt="List Icon" /> List
          </button>
        </div> */}

        {/* Right section with Filter Form and Create Task Button */}
        <div className="col-12 col-md-12">
          <div className="row">
            {/* Filter Form (takes up 8 columns on medium screens and 10 columns on large screens) */}
            <div className="col-12 col-md-8 col-lg-10 order-2 order-md-1">
              <FilterForm /> {/* Include FilterForm component */}
            </div>

            {/* Create Task Button (aligned to the right, with an icon) */}
            <div className="col-12 col-md-4 col-lg-2 d-flex justify-content-md-end order-1 order-md-2 my-4 my-md-0">
              <NavLink to="/create-task" className="btn-create-task d-inline-flex">
                Create Task <CiCirclePlus /> {/* Icon to accompany "Create Task" text */}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderFilterForm;
