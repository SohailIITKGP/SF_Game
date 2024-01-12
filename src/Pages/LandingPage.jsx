import React, { useState } from "react";
import LoginPage from "../Pages/LoginPage";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

import SFLogo from "../temp-imgs/sf-logo.webp";
import IITKGPLogo from "../temp-imgs/iit-kgp-logo.webp";
import IILU_NEW from "../temp-imgs/illu-new.webp";

const LandingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user,isLoggedIn } = useContext(UserContext);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="landing-page">
      <div className="navbar-logo">
        <a href="https://www.springfest.in">
          <img src={SFLogo} alt="SF_Logo" className="SF_Logo" />
        </a>
        <a href="https://www.iitkgp.ac.in">
          <img src={IITKGPLogo} alt="IIT_KGP_LOGO" className="IIT_KGP_LOGO" />
        </a>
      </div>

      {!isModalOpen && (
        <div className="">
          <div className="landing-page-ilu">
          <img src={IILU_NEW} alt="ilu" className="landing-page-ilu-img"/>
            {isLoggedIn ? (
              <div className="dashboard-lower-links">
                <Link to="dashboard" className="landing-page-dashboard-button">
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/payment"
                  className="dashboard-pay-button"
                >
                {user && !user.payment_status ? "Pay Now" : "Paid"}
                </Link>
              </div>
            ) : (
              <button className="landing-page-login-button" onClick={openModal}>
                Log In
              </button>
            )}
          </div>
        </div>
      )}
      <LoginPage isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LandingPage;