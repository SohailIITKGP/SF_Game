import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../context/userContext";
import SubEventsCard from "../components/Events/SubEventsCard";

import useFetchEventsData from "../hooks/useFetchEventsData";

import "../styles/SubEvents.css";

import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

export default function SubEvents() {
    const { category } = useParams();
	const navigate = useNavigate();
    const [activeEvent, setActiveEvent] = useState("centrifuge")

    const { eventsData } = useContext(UserContext);
    const [displaySubEventButtons, setDisplaySubEventButtons] = useState(-1);
    const [selectedEvent, setSelectedEvent] = useState(null);

	let prevEvent = "";
    let nextEvent = "";

    useFetchEventsData();

    const subEventsData = eventsData.filter(
        (event) => event.category === category
    )[0];

	useEffect(() => {
		let initialEvent = null;
		if (subEventsData) {
			initialEvent = subEventsData.events.filter(
				(event) => event.event_status !== 0
			)[0];
		}

		setSelectedEvent(initialEvent);
        
	}, [subEventsData]);

	document.querySelector(".sub-events-heading")?.addEventListener("click", () => {
		console.log("clicked");
		navigate(`/events/${prevEvent}`);
	});
	
    if (!subEventsData) return null;

    const subEvents = subEventsData.events;

    for (let i = 0; i < eventsData.length; i++) {
        if (eventsData[i].category === category) {
            prevEvent =
                i === 0
                    ? eventsData[eventsData.length - 1].category
                    : eventsData[i - 1].category;
            nextEvent =
                i === eventsData.length - 1
                    ? eventsData[0].category
                    : eventsData[i + 1].category;
        }
    }

	let startX = 0;
	function touchStart(event) {
		console.log("clicked");
		// navigate(`/events/${prevEvent}`);
		startX = event.touches[0].clientX;
	}

	function touchEnd(event) {
		const endX = event.changedTouches[0].clientX;
		if (endX - startX > 100) {
			navigate(`/events/${prevEvent}`);
		}	
		else if (startX - endX > 100) {
			navigate(`/events/${nextEvent}`);
		}
	}

    return (
        <div className="sub-events">
            <div className="navigate-to-diff-event">
                <Link
                    to={`/events/${prevEvent}`}
                    className="different-category-button"
                >
                    <KeyboardDoubleArrowLeftRoundedIcon
                        style={{
                            fontSize: "2rem",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    />
                </Link>
                <Link
                    to={`/events/${nextEvent}`}
                    className="different-category-button"
                >
                    <KeyboardDoubleArrowRightRoundedIcon
                        style={{
                            fontSize: "2rem",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    />
                </Link>
            </div>

            <div 
				className="sub-events-heading"
				onTouchStart={touchStart}
				onTouchEnd={touchEnd}
			>
				{category}
			</div>

            <div className="sub-event-navbar">
                {subEvents
                    .filter((subEvent) => subEvent.event_status !== 0)
                    .map((subEvent, index) => (
                        <div
                            className={`sub-event-navbar-name ${selectedEvent === subEvents[index] ? "active-sub-event" : ""}`}
                            key={index}
                            onClick={() => setSelectedEvent(subEvents[index])}
                        >
                            {subEvent.event}
                        </div>
                    ))}
            </div>

            {selectedEvent !== null &&  (
                <SubEventsCard
                    index={0}
                    subEvent={selectedEvent}
                    displaySubEventButtons={displaySubEventButtons}
                    setDisplaySubEventButtons={setDisplaySubEventButtons}
                />
            )}
        </div>
    );
}
