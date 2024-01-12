import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventsCard({ card, img }) {
  useEffect(() => {
    const colors = ["rgb(255,50,50)", "rgb(50,255,50)", "rgb(50,50,255)"];
    
    const eventCard = document.querySelectorAll(".events-card");
    for (let i = 0; i < eventCard.length; i++)
      eventCard[i].style.setProperty(
        "--pin-color",
        `${colors[Math.floor(colors.length * Math.random())]}`
      );
  }, []);

  return (
    <Link
      to={card.category.toString()}
      className="events-card"
      style={{
        animationDelay: `${Math.random() * 1}s`,
      }}
    >
      <img src={img} className="event-img" alt="eventimg" />
      <span>{card.category}</span>
    </Link>
  );
}
