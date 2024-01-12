import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import DashSubmitComplain from "./DashSubmitComplaint";
import createToast from "../../utils/createToast";


export default function DComplain() {

    const { isLoggedIn, user } = useContext(UserContext)
    const [complains, setComplains] = useState([])

    const getComplaints = () => {
        try {
            let url = "https://mainapi.springfest.in/api/user/get_complaints";

            axios.post(url, {
                "token": user.token
            }).then((response) => {
                if (response.data.code === 0) {
                    setComplains(response.data.message)
                } else {
                    console.error(response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const cancelComplain = (id) => {
        try {
            let url = "https://mainapi.springfest.in/api/user/cancel_complaint";

            axios.post(url, {
                "sf_id": user.sf_id,
                "complaint_id": id
            }).then((response) => {
                if (response.data.code === 0) {
                    createToast("Complaint Cancelled Successfully", "success")
                    getComplaints()
                } else {
                    console.error(response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getComplaints();
        }
        else {
            console.log("Not logged in")
        }
    }, [isLoggedIn])

    return (
        <>
            <div className="dashboard-modal-box__content-heading">
                REPORT ISSUE
            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                    SUBMIT COMPLAINT
                </div>

                <DashSubmitComplain getComplaintsFunc={getComplaints} />

            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                CURRENT COMPLAINTS
                </div>
                {
                    complains.length !== 0 ?
                        (
                            complains.map((item, index) => {
                                return (
                                    item.status === "UNRESOLVED" &&
                                    <div  key={index} className="dashboard-modal-box__content__items-list">
                                        <div className="dashboard-modal-box__content__items-list-item">
                                            <div className="dashboard-modal-box__content__items-list-item__name">
                                                {item.id}
                                            </div>
                                            <div className="dashboard-event-deregister dashboard-modal-box__content__items-list-item__name" onClick={() => cancelComplain(item.id)} >
                                                Cancel
                                            </div>
                                        </div>
                                        <div className="dashboard-events-members">
                                            <div className="dashboard-events-members__item">
                                                Issue: {item.issue}
                                            </div>
                                            <div className="dashboard-events-members__item ">
                                                Status: {item.status}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="dashboard-modal-box__content__items-list">
                                <div className="dashboard-modal-box__content__items-list-item">
                                    <div className="dashboard-modal-box__content__items-list-item__name">
                                        No Complaints 
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                    YOUR COMPLAINTS
                </div>
                {
                    complains.length !== 0 ?
                        (
                            complains.map((item, index) => {
                                return (
                                    item.status === "CANCELLED" &&
                                    <div  key={index} className="dashboard-modal-box__content__items-list">
                                        <div className="dashboard-modal-box__content__items-list-item">
                                            <div className="dashboard-modal-box__content__items-list-item__name">
                                                {item.id}
                                            </div>
                                            {/* <div className="dashboard-event-deregister dashboard-modal-box__content__items-list-item__name" onClick={() => cancelComplain(item.id)} >
                                                Cancel
                                            </div> */}
                                        </div>
                                        <div className="dashboard-events-members">
                                            <div className="dashboard-events-members__item">
                                                Issue: {item.issue}
                                            </div>
                                            <div className="dashboard-events-members__item ">
                                                Status: {item.status}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="dashboard-modal-box__content__items-list">
                                <div className="dashboard-modal-box__content__items-list-item">
                                    <div className="dashboard-modal-box__content__items-list-item__name">
                                        No Complaints 
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
            <div className="dashboard-modal-box__content__items">
                <div className="dashboard-modal-box__content__items-heading">
                    RESOLVED COMPLAINTS
                </div>
                {
                    complains.length !== 0 ?
                        (
                            complains.map((item, index) => {
                                return (
                                    item.status === "RESOLVED" &&
                                    <div  key={index} className="dashboard-modal-box__content__items-list">
                                        <div className="dashboard-modal-box__content__items-list-item">
                                            <div className="dashboard-modal-box__content__items-list-item__name">
                                                {item.id}
                                            </div>
                                            {/* <div className="dashboard-event-deregister dashboard-modal-box__content__items-list-item__name" onClick={() => cancelComplain(item.id)} >
                                                Cancel
                                            </div> */}
                                        </div>
                                        <div className="dashboard-events-members">
                                            <div className="dashboard-events-members__item">
                                                Issue: {item.issue}
                                            </div>
                                            <div className="dashboard-events-members__item ">
                                                Status: {item.status}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="dashboard-modal-box__content__items-list">
                                <div className="dashboard-modal-box__content__items-list-item">
                                    <div className="dashboard-modal-box__content__items-list-item__name">
                                        No Complaints 
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    );
};