import { useFormik } from "formik";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import createToast from "../../utils/createToast";
import allEvents from "../../utils/allEvents";
import "../../styles/DashSubmitComplaint.css";

function containsNumber(str) {
    return /\d/.test(str);
}
export default function DashSubmitComplain(props) {
    const { user } = useContext(UserContext)

    // State for conditional rendering
    const [showEventsType, setShowEventsType] = useState(false)
    const [showIssueSubmit, setShowIssueSubmit] = useState(false)

    // Custom Validations
    const validate = (values) => {
        if (values.nature === "0") {
            createToast("Please select issue nature", "error")
            return false
        }
        if (values.event_name.length < 3 && showEventsType) {
            createToast("Please select an Event", "error")
            return false
        }
        if (values.issue_type === "0" && showEventsType) {
            createToast("Please select issue type", "error")
            return false
        }
        if (values.issue.length < 10) {
            createToast("Explain your issue briefly", "error")
            return false
        }
        if (containsNumber(values.issue)) {
            createToast("Issue must not contains any numbers", "error")
            return false
        }

        return true
    }

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            nature: "",
            event_name: "",
            issue_type: "",
            issue: "",
        },
        onSubmit: (values, action) => {
            if (!validate(values)) {
                return
            }
            handleSubmitIssue(values)
            // console.log(values)
            action.resetForm()
        },
    });

    // Custom Change Handler for "nature"
    const handleCustomChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nature') {
            if (value === 'reg_deReg') {
                setShowEventsType(true)
                setShowIssueSubmit(true)
            } else if (value === 'others') {
                setShowEventsType(false)
                setShowIssueSubmit(true)
            }
            else {
                setShowEventsType(false)
                setShowIssueSubmit(false)
            }
        }

        handleChange(e);
    };

    const handleSubmitIssue = (values) => {
        const url = "https://mainapi.springfest.in/api/complaint/submit_complaint";

        axios.post(url, {
            token: user.token,
            complaint_nature: values.nature,
            issue: values.issue,
            transaction_id: ""
        })
            .then((response) => {
                if (response.data.code === 0) {
                    createToast("Issue successfully submitted", "success")
                    props.getComplaintsFunc()
                } else {
                    createToast("Failed to submit Issue", "error")
                }
            })
            .catch((error) => {
                createToast("Failed to submit Issue", "error")
                console.log(error)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="complaint-form-container" >
                <div className="complaint-form-group">
                    <label htmlFor="nature">Issue Where: </label>
                    <select
                        name="nature"
                        id="nature"
                        className="complaint-form-control"
                        onChange={handleCustomChange}
                        onBlur={handleBlur}
                        value={values.nature}
                    >
                        <option value="0">Select Issue</option>
                        <option value="reg_deReg">Event Registration Issue</option>
                        <option value="others">Other's</option>
                    </select>

                </div>
                {showEventsType && <>
                    <div className="complaint-form-group">
                        <label htmlFor="event_name">Event Name</label>
                        <select
                            name="event_name"
                            id="event_name"
                            className="complaint-form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.event_name}
                        >
                            <option value="0">Select Event</option>
                            {
                                allEvents.map((element) => (
                                    <option value={element.event} key={element.id}>{element.event}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="complaint-form-group">
                        <label htmlFor="issue_type">Issue Type</label>
                        <select
                            name="issue_type"
                            id="issue_type"
                            className="complaint-form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.issue_type}
                        >
                            <option value="0">Select Issue</option>
                            <option value="eventReg">Registration Issue</option>
                            <option value="deReg_other">De-Registration or Other Issue's</option>
                        </select>
                    </div></>
                }

                {showIssueSubmit && <>
                    <div className="complaint-form-group">
                        <label htmlFor="issue">Issue</label>
                        <input
                            type="text"
                            name="issue"
                            id="issue"
                            className="complaint-form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.issue}
                        />

                    </div>
                    <button type="submit" className="complaint-submit-button">
                        Submit
                    </button>
                </>

                }
            </form>
        </>
    );
};