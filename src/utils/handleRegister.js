import axios from "axios";
import createToast from "./createToast";

const registerEvent = async (registrationData) => {
    try {
        const response = await axios.post(
            "https://mainapi.springfest.in/api/event/register",
            registrationData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        return response.data;
    } catch (error) {
      createToast("Could not Register for the Event", "error");
        console.error("Error registering:", error);
        throw error;
    }
};

export default registerEvent;
