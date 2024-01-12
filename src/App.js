import "./App.css";

import LandingPage from "./Pages/LandingPage";
import Events from "./Pages/Events";
import SubEvents from "./Pages/SubEvents";
import Gallery from "./Pages/Gallery";
import Accommodation from "./Pages/Accomodation.jsx";
import NoPage from "./Pages/NoPage";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Navbar";
import Game from "./components/Game/Game.tsx";
import GamePage from "./Pages/GamePage.jsx";
import TrafficRunner from "./Pages/TrafficRunner.jsx";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import YoutubeEmbed from "./Pages/YoutubeEmbed.jsx";
// import Faq from "./Pages/Faq.jsx";
import FAQBeta from "./Pages/FAQBeta.jsx";
import Contingent from "./components/Contingent/Contingent.jsx";
import Merch from "./Pages/Merch.jsx";
import PaymentIndividual from "./components/PaymentIndividual/PaymentIndividual.jsx";
import { useState } from "react";
import Preloader from "./components/preloader/preloader.jsx";

export default function App() {
	return (
		<>
			<Preloader />
			<Routes>
				<Route index path="/" element={<LandingPage />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="merch" element={<Merch />} />
				<Route path="events" element={<Events />} />
				<Route path="events/:category" element={<SubEvents />} />
				<Route path="accommodation/*" element={<Accommodation />} />
				<Route path="gallery" element={<Gallery />} />
				<Route
					path="movie"
					element={<YoutubeEmbed embedId={"r-Tr-ivYPt0"} />}
				/>
				<Route path="/tilesladder" element={<Game />} />
				<Route path="/gamepage" element={<GamePage />} />
				<Route path="/trafficrunner" element={<TrafficRunner />} />
				<Route path="/faq" element={<FAQBeta />} />

				<Route path="/dashboard/payment" element={<PaymentIndividual />} />
				{/* <Route
					path="/accomodation/contingent/payment"
					element={<Contingent />}
				/> */}
				<Route path="*" element={<NoPage />} />
			</Routes>
			<Navbar />
			<ToastContainer />
		</>
	);
}
