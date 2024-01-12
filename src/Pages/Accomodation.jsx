import { Routes, Route, useNavigate } from "react-router-dom";
import "../styles/Accomodation.scss";
import AccoSideNav from "../components/Accomodation/AccoSideNav";
import AccomodationContent from "../components/Accomodation/AccoContent";
import Contingent from "../components/Contingent/Contingent.jsx"
import { UserContext } from "../context/userContext.js";
import { useContext } from "react";


export default function Accomodation() {

    const navigate = useNavigate();
    const { isLoggedIn } =  useContext(UserContext);

    return (
        <div className="accomodation-container">
            <AccoSideNav />
            <Routes>
                <Route path="/info" element={<AccomodationContent mainheading={"INFO"} />} />
                <Route path="/aboutus" element={<AccomodationContent mainheading={"ABOUT US"} />} />
                <Route path="/maptokgp" element={<AccomodationContent mainheading={"REACHING IIT KGP"} />} />
                <Route path="/faq" element={<AccomodationContent mainheading={"FAQS"} />} />
                <Route path="/rules" element={<AccomodationContent mainheading={"RULES"} />} />
                <Route path="/" element={
                    isLoggedIn ? <Contingent /> : <AccomodationContent mainheading={"INFO"} />
                } />
            </Routes>

        </div>
    );
}