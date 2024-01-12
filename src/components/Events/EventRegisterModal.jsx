import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import registerEvent from "../../utils/handleRegister";
import CloseIcon from "@mui/icons-material/Close";
import createToast from "../../utils/createToast";
import { useParams } from "react-router-dom";

export default function EventRegisterModal({
    openSubEventRegisterModal,
    onCloseSubEventRegisterModal,
    subEvent,
}) {
    const { user, isLoggedIn } = useContext(UserContext);
    const [chosenNumberOfParticipants, setChosenNumberOfParticipants] = useState(subEvent.min_participation);
    const [memberIDs, setMemberIDs] = useState(isLoggedIn ? [user.sf_id] : []);

    const category = useParams().category;
    const img = `/assets/Events/${category}/${subEvent.event.replaceAll(" ", "")}.png`;

    const numberOfParticipantsArray = [];
    for (let i = subEvent.min_participation; i <= subEvent.max_participation; i++)
        numberOfParticipantsArray.push(i);


    const handleMemberIDChange = (index, value) => {
        const updatedMemberIDs = [...memberIDs];
        if (updatedMemberIDs.length === index) {
            updatedMemberIDs.push(value);
            setMemberIDs(updatedMemberIDs);
            return;
        }
        updatedMemberIDs[index] = value;
        setMemberIDs(updatedMemberIDs);
    };

    const handleRegister = async () => {

        if (!isLoggedIn) {
            createToast("Please login to register for events", "warning");
            return;
        }

        try {
            const registrationData = {};
            registrationData.event_city = user.city;
            registrationData.token = user.token;
            registrationData.event_id = subEvent.id;
            registrationData.event_reg = memberIDs.map((id) => {
                let tempId = {
                    sf_id: id,
                    email: "test@test.test",
                };
                return tempId;
            });

            const response = await registerEvent(registrationData);
            console.log(response);

            if (response.code === 0) {
                createToast(response.message, "success");
                onCloseSubEventRegisterModal();
            }
            else if (response.code === -5) {
                createToast("Invalid member details! Enter valid SF ID.", "warning");
            }
            else if (response.code === -4) {
                createToast("Participant/s Already Registered For This Event.", "warning");
            }
            else if (response.code === -2) {
                createToast("Registration unsuccessful. Please logout and login again", "warning");
            }
            else if (response.code === -10) {
                createToast(response.message, "warning");
            }
            else if (response.code === -6) {
                createToast(response.message, "warning");
            }
            else {
                createToast("Registration unsuccessful. Please logout and login again", "error");
            }
        } catch (error) {
            console.log("error occurred in sending data", error);
        }
    };

    
    return (
        <div
            className="sub-event-register-modal-overlay"
            onClick={onCloseSubEventRegisterModal}
        >
            <div
                className="sub-event-register-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <CloseIcon
                    className="login-close"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={onCloseSubEventRegisterModal}
                />
                <div className="sub-event-register-modal-content">
                    <h1 className="sub-event-register-modal-title">
                        Register for <br /> "{subEvent.event}"
                    </h1>

                    <div className="sub-event-register-modal-image">
                        <img src={img} alt="sub event " />
                    </div>

                    {subEvent.is_group === 1 && (
                        <>
                            <div className="sub-event-register-modal-note">
                                Note: You will be considered as team leader. If
                                anyone other than you is supposed to be the
                                leader, ask him/her to register.
                            </div>
                            <select
                                name="Number Of Participants"
                                className="choose-number-of-participants"
                                onChange={(e) => {
                                    setChosenNumberOfParticipants(parseInt(e.target.value));
                                }}
                            >
                                {numberOfParticipantsArray.map(
                                    (numberOfParticipant, index) => (
                                        <option key={index}>
                                            {numberOfParticipant}
                                        </option>
                                    )
                                )}
                            </select>
                        </>
                    )}

                    <div className="sub-event-register-modal-inputs">
                        <div className="sub-event-register-modal-input">
                            <div className="sub-event-register-modal-input-label">
                                Your User ID
                            </div>
                            {isLoggedIn ? (
                                <input
                                    type="text"
                                    placeholder="Enter your user ID"
                                    disabled
                                    value={user.sf_id}
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Login to see your id"
                                    disabled
                                />
                            )}
                        </div>

                        {
                            subEvent.is_group === 1 &&
                            [...Array(chosenNumberOfParticipants)].map(
                                (numberOfParticipant, index) =>
                                    index !== 0 && (
                                        <div className="sub-event-register-modal-input" key={index}>
                                            <div className="sub-event-register-modal-input-label">
                                                Member {index + 1} ID
                                            </div>
                                            <input
                                                type="text"
                                                placeholder={`Member ${index + 1} ID`}
                                                required
                                                onChange={(e) =>
                                                    handleMemberIDChange(index, e.target.value)
                                                }
                                            />
                                        </div>
                                    )
                            )
                        }
                    </div>

                    <button
                        className="sub-event-modal-register-button"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
