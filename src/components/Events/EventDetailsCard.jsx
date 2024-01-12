import React from "react";
import { useParams } from "react-router-dom";
import createToast from "../../utils/createToast";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const EventDetailsCard = ({ subEvent, setSubEventRegisterModal }) => {
  const { isLoggedIn } = useContext(UserContext);
  const category = useParams().category;
  const img = `/assets/Events/${category}/${subEvent.event.replaceAll(" ", "")}.png`;
  console.log(subEvent.event.replaceAll(" ", ""))

  const handleRegisterClick = () => {
    if(isLoggedIn)  setSubEventRegisterModal(true);
    else {
      createToast("Please login to Register", "warning");
    }
  };

  return (
    <div className="event-details-card">
      <div className="sub-event-details-header">
        <div className="sub-event-details-image">
          <img src={img} alt="sub-event-img" />
        </div>
        <div className="sub-event-details-header-content">
          <h2>{subEvent.event}</h2>
          <div className="sub-event-details-tagline">{subEvent.tagline}</div>
          <button
            className="sub-event-details-modal-register-button"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>

      <div className="sub-event-details-content">
        <h2>About</h2>
        <div className="sub-event-details-writeup">{subEvent.writeup}</div>
        <h2>Rules</h2>

        <div className="sub-event-details-rules">
          {subEvent.rules
            .filter((rule) => rule.type)
            .map((rule, index) => (
              <div key={index}>{rule.type}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;

