import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/userContext"

import createToast from "../../utils/createToast"

export default function Event() {

    const [soloEvents, setSoloEvents] = useState([])
    const [groupEvents, setGroupEvents] = useState([])
    const { isLoggedIn, user } = useContext(UserContext)

    const getEvents = async () => {
        try {
            let url = "https://mainapi.springfest.in/api/user/get_registered_events";

            const response = await axios.post(url, {
                "token": user.token
            })

            if (response.data.code === 0) {
                setSoloEvents(response.data.message.solo)
                setGroupEvents(response.data.message.group)
            } else {
                console.error(response.data.message)
            }
        } catch (error) {

        }
    }

    const handleDeRegisterMember = async (event_id) => {
        try {
            const url = "https://mainapi.springfest.in/api/event/deregister_member";
            const response = await axios.post(
                url,
                {
                    "token": user.token,
                    "event_id": event_id,
                    "type": "solo"
                }
            )

            if (response.data.code === 0) {
                createToast("Successfully Deregistered", "success");
                getEvents();
            }
        } catch (error) {
        }
    }

    const handleDeRegisterTeam = async (event_id, group_id) => {
        try {
            const url = "https://mainapi.springfest.in/api/event/deregister_team";
            axios.post(
                url,
                {
                    "token": user.token,
                    "event_id": event_id,
                    "group_id": group_id,
                }
            )
                .then((response) => {

                    if (response.data.code === 0) {
                        // console.log("Deregistering team")
                        createToast("Successfully Deregistered", "success");
                        getEvents();
                    }
                    else {
                        createToast(response.data.message , "error");
                    }
                })
        } catch (error) {
            console.log("Error in deregistering", error)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getEvents()
        }
        else {
            console.log("Not logged in")
        }
    }, [isLoggedIn])


    return (
        <>
            <div className="dashboard-modal-box__content-heading">
                REGISTERED EVENTS
            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                    SOLO EVENTS
                </div>
                <div className="dashboard-modal-box__content__items-list">
                    {
                        soloEvents.length ?
                        soloEvents.map((item, index) => {
                            return (
                                <div  key={index} className="dashboard-modal-box__content__items-list-item">
                                    <div className="dashboard-modal-box__content__items-list-item__name">
                                        {item.event_name}
                                    </div>
                                    <div className="dashboard-event-deregister dashboard-modal-box__content__items-list-item__name" onClick={() => handleDeRegisterMember(item.event_id)}>
                                        Deregister
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="dashboard-modal-box__content__items-list-item">
                                <div className="dashboard-modal-box__content__items-list-item__name">
                                    No Events Registered
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                    GROUP EVENTS
                </div>
                <div className="dashboard-modal-box__content__items-list">
                    {
                        groupEvents.length ?
                        groupEvents.map((item, index) => {
                            return (
                                <>
                                    <div className="dashboard-modal-box__content__items-list-item" key={index}>
                                        <div className="dashboard-modal-box__content__items-list-item__name">
                                            <h3>{item.event_name}</h3>
                                        </div>
                                        <div className="dashboard-event-deregister dashboard-modal-box__content__items-list-item__name" onClick={() => handleDeRegisterTeam(item.event_id, item.group_id)} >
                                            Deregister
                                        </div>
                                    </div>
                                    <div className="dashboard-events-members">
                                        {
                                            item.members &&
                                            item.members.map((member, index) => {
                                                return (
                                                    <div className="dashboard-events-members__item" key={index}>
                                                        {member.member_name}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }) : (
                            <div className="dashboard-modal-box__content__items-list-item">
                                <div className="dashboard-modal-box__content__items-list-item__name">
                                    No Group Events Registered
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}