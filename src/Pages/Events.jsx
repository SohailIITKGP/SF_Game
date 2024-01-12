import { useContext } from "react";

import EventsCard from "../components/Events/EventsCard";
import "../styles/Events.css";

import { UserContext } from "../context/userContext";
import useFetchEventsData from "../hooks/useFetchEventsData";

import dance from "../assets/Genres/Dance.png";
import music from "../assets/Genres/Music.png";
import drama from "../assets/Genres/Drama.png";
import literary from "../assets/Genres/Literary.png";
import filmFest from "../assets/Genres/FilmFest.png";
import foodFest from "../assets/Genres/FoodFest.png";
import quiz from "../assets/Genres/Quiz.png";
import fineArts from "../assets/Genres/FineArts.png";

import fashion from "../assets/Genres/Fashion.png";
import gameFest from "../assets/Genres/GameFest.png";
import humourFest from "../assets/Genres/HumourFest.png";

export default function Events() {
    const { eventsData } = useContext(UserContext);

    const img = [dance, music, drama, literary, filmFest, quiz, fineArts, foodFest, fashion, gameFest, humourFest];

    useFetchEventsData();

    return (
        <>
            <div className="events">
                <h1 className="events-heading">Events</h1>
                <div className="events-cards-container">
                    {eventsData.map((item, index) => {
                        if(item?.events.length === 0)
                            return null;

                        let event_status = item.events.every((event) => event.event_status === 0) ? 0 : 1;
                        if(event_status === 0)
                            return null;

                        return <EventsCard key={index} card={item} img={img[index]}/>;
                    })}
                </div>
            </div>
        </>
    );
}
