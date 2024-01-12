import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Acco_Sidebar.scss";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import createToast from "../../utils/createToast";

import INFO from "../../assets/Icons/Info.png";
import ABOUTUS from "../../assets/Icons/AboutUs.png";
import MAPTOKGP from "../../assets/Icons/MapToKgpIcon.png";
import FAQ from "../../assets/Icons/FAQ.png";
import RULES from "../../assets/Icons/Rules.png";
import CONTINGENT from "../../assets/Icons/Contingent.png";

const Acco_SideNav = () => {
    const { isLoggedIn } = useContext(UserContext);
    const [isSidebarClosed, setIsSidebarClosed] = useState(true);

    const handleCloseMenu = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const handlePaymentClick = () => {
        if (!isLoggedIn) {
            createToast("Please Login to join or create Contingent", "error");
        }
    };

    return (
        <div className={`sidebar ${isSidebarClosed ? "closed" : "open"}`}>
            <div className="sidebar-heading">SPRING FEST</div>

            <div className="burgerContainer" onClick={() => handleCloseMenu()}>
                <div className="burgerMenu"></div>
            </div>

            <div className="contentsContainer">
                <Link
                    to="/accommodation/info"
                    className="accomodation-tooltip"
                    onClick={scrollToTop()}
                >
                    <div className="acco_icon">
                        <img src={INFO} alt="Info" />
                    </div>
                    <div className="head">Info</div>
                    <span className="tooltip">Info</span>
                </Link>
                
                {/* <Link
                    to="/accommodation/aboutus"
                    className="accomodation-tooltip"
                    onClick={scrollToTop()}
                >
                    <div className="acco_icon">
                        <img src={ABOUTUS} alt="About" />
                    </div>
                    <div className="head">About Us</div>
                    <span className="tooltip">About Us</span>
                </Link> */}
                
                <Link
                    to={`${
                        isLoggedIn
                            ? "/accommodation"
                            : "/accommodation/info"
                    }`}
                    className="accomodation-tooltip"
                    onClick={() => {
                        handlePaymentClick();
                        scrollToTop();
                    }}
                >
                    <div className="acco_icon ">
                        <img src={CONTINGENT} alt="Rules" />
                    </div>
                    <div className="head">Contingent</div>
                    <span className="tooltip">Contingent</span>
                </Link>
                
                <Link
                    to="/accommodation/rules"
                    className="accomodation-tooltip"
                    onClick={scrollToTop()}
                >
                    <div className="acco_icon ">
                        <img src={RULES} alt="Rules" />
                    </div>
                    <div className="head">Rules</div>
                    <span className="tooltip">Rules</span>
                </Link>

                <Link
                    to="/accommodation/faq"
                    className="accomodation-tooltip"
                    onClick={scrollToTop()}
                >
                    <div className="acco_icon acco_icon_FAQ">
                        <img src={FAQ} alt="Faq" />
                    </div>
                    <div className="head">FAQ's</div>
                    <span className="tooltip">FAQ's</span>
                </Link>
                
                <Link
                    to="/accommodation/maptokgp"
                    className="accomodation-tooltip"
                    onClick={scrollToTop()}
                >
                    <div className="acco_icon">
                        <img src={MAPTOKGP} alt="map" />
                    </div>
                    <div className="head">Map To KGP</div>
                    <span className="tooltip">Map To KGP</span>
                </Link>

            </div>
        </div>
    );
};

export default Acco_SideNav;
