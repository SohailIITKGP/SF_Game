import React, { useState } from "react";
import EventDetailsCard from "./EventDetailsCard";
import EventRegisterModal from "./EventRegisterModal";

import "../../styles/SubEventsRegisterModals.css";
import "../../styles/SubEventsDetails.css";

export default function SubEventsCard({
	index,
	subEvent,
	displaySubEventButtons,
	setDisplaySubEventButtons,
}) {
	const [subEventRegisterModal, setSubEventRegisterModal] = useState(false);
	const toggle = (e) => {
		if (displaySubEventButtons !== index) setDisplaySubEventButtons(index);
		else setDisplaySubEventButtons(-1);
	};

	return (
		<div
			className={`sub-events-card  ${!subEventRegisterModal && displaySubEventButtons === index && "open"}`}
			onClick={toggle}
		>
			<EventDetailsCard
				subEvent={subEvent}
				setSubEventRegisterModal={setSubEventRegisterModal}
			/>

			{subEventRegisterModal && (
				<EventRegisterModal
					openSubEventRegisterModal={subEventRegisterModal}
					onCloseSubEventRegisterModal={() => setSubEventRegisterModal(false)}
					subEvent={subEvent}
				/>
			)}
		</div>
	);
}