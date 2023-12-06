import React from 'react';
import "./dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import Second from './Second/Second';
import Third from './Third/Third';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`containerDashboard`}>
          <nav className="navbar navbar-expand-lg fixed-top d-md-flex">
            <div className="container-fluid">
              <h3 className='text-light'>Welcome, </h3>
              <div className="ml-auto d-flex align-items-center">
                <Link to="#" className=""><i className="fa-solid fa-bell text-light"></i></Link>
                <Link to="#" className=""><i className="fa-solid fa-envelope text-light"></i></Link>
                <button className='btn btn-outline-danger' onClick={logout}>Logout</button>
              </div>
            </div>
          </nav>
      <div className={`col-3 leftSide`}>
          <h1 className='mt-5'></h1>
          <div className="">
            <Link to="/dashboard" className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-house"></i>
              <p className='ms-2 mb-0'>Dashboard</p>
            </Link>
            <Link to={"/schedule"} className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-calendar-days"></i>
              <p className='ms-2 mb-0'>Schedule</p>
            </Link>
            <Link to="/courses" className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-book"></i>
              <p className='ms-2 mb-0'>Courses</p>
            </Link>
            <Link to="/gradebook" className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-graduation-cap"></i>
              <p className='ms-2 mb-0'>Gradebook</p>
            </Link>
            <Link to="/performance" className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-chart-line"></i>
              <p className='ms-2 mb-0'>Performance</p>
            </Link>
            <Link to="/announcement" className={`nav-link icons d-flex align-items-center mb-2`}>
              <i className="fa-solid fa-bullhorn"></i>
              <p className='ms-2 mb-0'>Announcement</p>
            </Link>
          </div>
      </div>
      <div className={`topRightSide col-9`} style={{ marginTop: "56px" }}>
        <Second />
        <Third />
      </div>
    </div>
  );
};

export default Dashboard;


