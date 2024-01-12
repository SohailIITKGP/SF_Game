import {useContext, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../context/userContext";

export default function useFetchEventsData() {
    const {setEventsData} = useContext(UserContext);

    const url = "https://mainapi.springfest.in/api/event/get_all_event_details";

	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(url);
			const data = await res.data.message;

			const filteredData = data.map((event) => ({
				...event,
				events: event.events.filter((subevent) => subevent.event_status !== 0),
			  })
			  ).filter((event) => event.events.length > 0);
            // console.log(filteredData);
			setEventsData(filteredData);
		}
		fetchData();

	}, [setEventsData, url]);
}