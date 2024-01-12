import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

import createToast from "../utils/createToast";
import "../styles/Navbar.css";

//importing icons
import home from "../temp-imgs/home.webp";
import acc from "../temp-imgs/accommodation.webp";
import more from "../temp-imgs/more.webp";
import event from "../temp-imgs/event.webp";
import merch from "../temp-imgs/merch.webp";

// import home from "../assets/Icons/HomeIcon.png";
// import acc from "../assets/Icons/Accomodation.png";
// import more from "../assets/Icons/Moreicon3.png";
// import event from "../assets/Icons/Events.png";
// import merch from "../assets/Icons/Merch.png";

import gallery from "../assets/Icons/Gallery.png";
import faq from "../assets/Icons/FAQ.png";
import team from "../assets/Icons/OurTeam.png";
import sponsors from "../assets/Icons/Sponsors.png";
import afterMovie from "../assets/Icons/AfterMovie.png";
import games from "../assets/Icons/Game.png";

// import gallery from "../temp-imgs/gallery.png";
// import faq from "../temp-imgs/faq.png";
// import team from "../temp-imgs/team.png";
// import sponsors from "../temp-imgs/sponsors.png";
// import movie from "../temp-imgs/movie.png";
// import games from "../temp-imgs/game.png";

import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "react-bootstrap-icons";

export default function Navbar() {
    const { isLoggedIn } = useContext(UserContext);

    const findCurrentSection = () => {
        const location = window.location.pathname;

        if (location.startsWith("/accommodation")) currentSection = 4;
        else if (location.startsWith("/events")) currentSection = 2;
        else if (location.startsWith("/merch")) currentSection = 1;
        else if (location === "/"||location.startsWith("/dashboard")) currentSection = 3;
        else currentSection = 5;
    };

    let currentSection = 3;
    findCurrentSection();

    const [currentSectionOpen, setCurrentSectionOpen] = useState(currentSection);
    const [exploreMoreOpen, setExploreMoreOpen] = useState(false);

    const changeOpenSection = (openSection) => {
        setCurrentSectionOpen(openSection);

        // const mainNavbar = document.querySelector(".main-navbar");
        const light = document.querySelector(".navbar-light");
        const lightBar = document.querySelector(".navbar-light-bar");
        const link = document.querySelector(
            `.navbar-link:nth-child(${openSection})`
        );

        const linkPosition = link.getBoundingClientRect();
        const lightBarRect = lightBar.getBoundingClientRect();

        light.style.left = `calc(${linkPosition.x + linkPosition.width / 2 - lightBarRect.width / 2}px)`;

        let barColors = ["#FDDB76", "#C44AAF", "#501E5D", "#549FC5", "#c7c7c7"];
        // let borderColors = ["#FDDB76", "#8F4498", "#4A1C5C", "#202C4B", "#c7c7c7"];
        // let borderColors = barColors;
        let lightColors = [
            `linear-gradient(to bottom, ${barColors[0]}, rgba(0, 0, 0, 0))`,
            `linear-gradient(to bottom, ${barColors[1]}, rgba(0, 0, 0, 0))`,
            `linear-gradient(to bottom, ${barColors[2]}, rgba(0, 0, 0, 0))`,
            `linear-gradient(to bottom, ${barColors[3]}, rgba(0, 0, 0, 0))`,
            `linear-gradient(to bottom, ${barColors[4]}, rgba(0, 0, 0, 0))`,
        ];

        let lightColor = lightColors[openSection - 1];
        // let barColor = barColors[openSection - 1];
        // let borderColor = borderColors[openSection - 1];

        light.style.setProperty("--navbar-light-glow", lightColor);
        // light.style.setProperty('--navbar-light-bar', barColor);
        // mainNavbar.style.setProperty('--navbar-border-color', borderColor);
    };

    const handleButtonClick = (e, section) => {
        changeOpenSection(section);
        setExploreMoreOpen(false);
        e.stopPropagation();
    };

    const handleExploreMoreClick = (e) => {
        setExploreMoreOpen((prev) => !prev);
        if (exploreMoreOpen) 
        {
            findCurrentSection();
            changeOpenSection(currentSection);
        }
        else
            changeOpenSection(5);

        e.stopPropagation();
    }

    useEffect(() => {
        changeOpenSection(currentSection);
        document.addEventListener("click", () => {
            findCurrentSection();

            changeOpenSection(currentSection);
            setExploreMoreOpen(false);
        });
    }, []);

    return (
        <div className="navbar" onClick={(e) => e.stopPropagation()}>
            <div className={`navbar-explore-more ${exploreMoreOpen && "navbar-explore-more-active"}`} onClick={(e) => e.stopPropagation()}>
                <div className="navbar-explore-more-links">
                    <Link to="/gallery" className="navbar-explore-more-link" onClick={(e) => handleButtonClick(e, 5)} >
                        <img className="navbar-explore-more-link-icon" src={gallery} alt="gallery" />
                        <p className="navbar-explore-more-link-text">Gallery</p>
                    </Link>
                    <a href="http://sponsors.springfest.in" className="navbar-explore-more-link" >
                        <img className="navbar-explore-more-link-icon" src={sponsors} alt="gallery" />
                        <p className="navbar-explore-more-link-text"> Sponsors </p>
                    </a>
                    <Link to="/movie" className="navbar-explore-more-link" onClick={(e) => handleButtonClick(e, 5)} >
                        <img className="navbar-explore-more-link-icon" src={afterMovie} alt="gallery" />
                        <p className="navbar-explore-more-link-text"> After Movie </p>
                    </Link>
                    <Link to="/faq" className="navbar-explore-more-link" onClick={(e) => handleButtonClick(e, 5)} >
                        <img className="navbar-explore-more-link-icon" src={faq} alt="gallery" />
                        <p className="navbar-explore-more-link-text">FAQ</p>
                    </Link>
                    <a href="http://teams.springfest.in" className="navbar-explore-more-link" >
                        <img className="navbar-explore-more-link-icon" src={team} alt="gallery" />
                        <p className="navbar-explore-more-link-text"> Our Team </p>
                    </a>
                    <Link to={`${isLoggedIn ? "/tilesladder" : "/"}`} className="navbar-explore-more-link"
                        onClick={(e) => {
                            handleButtonClick(e, 5);
                            if(!isLoggedIn) createToast("Login to play the game", "warning");
                        }}
                    >
                        <img className="navbar-explore-more-link-icon" src={games} alt="gallery" />
                        <p className="navbar-explore-more-link-text">Games</p>
                    </Link>
                    
                    <div className="navbar-explore-more-socials-links">
                        <a href="https://www.facebook.com/springfest.iitkgp"><Facebook className="navbar-explore-more-socials-link" /></a>
                        <a href="https://www.instagram.com/iitkgp.springfest"><Instagram className="navbar-explore-more-socials-link" /></a>
                        <a href="https://www.linkedin.com/in/sfiitkgp/"><Linkedin className="navbar-explore-more-socials-link" /></a>
                        <a href="https://twitter.com/springfest_kgp"><Twitter className="navbar-explore-more-socials-link" /></a>
                        <a href="https://www.youtube.com/c/SpringFestForever"><Youtube className="navbar-explore-more-socials-link" /></a>
                        {/* <div className="navbar-explore-more-socials-link">f</div>
                        <div className="navbar-explore-more-socials-link">i</div>
                        <div className="navbar-explore-more-socials-link">t</div>
                        <div className="navbar-explore-more-socials-link">y</div>
                        <div className="navbar-explore-more-socials-link">l</div> */}
                    </div>
                </div>
            </div>

            <div className="main-navbar">
                <div className="navbar-light">
                    <div className="navbar-light-bar"></div>
                    <div className="navbar-light-glow"></div>
                </div>

                <div className="navbar-links">
                    <Link to="/merch" className={`navbar-link ${currentSectionOpen === 1 && "current-open-section"}`} onClick={(e) => handleButtonClick(e, 1)} >
                        <img className="navbar-link-icon" src={merch} alt="Home" />
                        <p className="navbar-link-text">Merch</p>
                    </Link>
                    <Link to="/events" className={`navbar-link ${currentSectionOpen === 2 && "current-open-section"}`} onClick={(e) => handleButtonClick(e, 2)} >
                        <img className="navbar-link-icon" src={event} alt="Home" />
                        <p className="navbar-link-text">Events</p>
                    </Link>
                    <Link to="/" className={`navbar-link ${currentSectionOpen === 3 && "current-open-section"}`} onClick={(e) => handleButtonClick(e, 3)} >
                        <img className="navbar-link-icon" src={home} alt="Home" />
                        <p className="navbar-link-text">Home</p>
                    </Link>

                    <Link to="/accommodation" className={`navbar-link ${currentSectionOpen === 4 && "current-open-section"}`} onClick={(e) => handleButtonClick(e, 4)} >
                        <img className="navbar-link-icon" src={acc} alt="Home" />
                        <p className="navbar-link-text">Accommodation</p>
                    </Link>
                    <div className={`navbar-link ${currentSectionOpen === 5 && "current-open-section"}`} onClick={handleExploreMoreClick} >
                        <img className="navbar-link-icon" src={more} alt="Home" />
                        <p className="navbar-link-text">More</p>
                    </div>
                </div>
            </div>
        </div>
    );
}