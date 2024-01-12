export const get_all_activities = () =>
    HTTP.post("api/activity/get_all_activities", { headers: headers })
        .then(
            response => { return response.data.data; }
        ).catch(err => {
            //console.log(err);
            return "error";
        })

export const getReminders = (data) =>
    HTTP.post("api/user/get_activities", JSON.stringify(data), { headers: headers })
        .then(
            response => {
                if (response.data.code === 0) {
                    return response.data.data;
                }
                else return "error";
            }
        ).catch(err => {
            return "error";
        })

export const remind_activity = (data) =>
    HTTP.post("api/user/remind_activity", JSON.stringify(data), { headers: headers })
        .then(res => {
            if (res.data.code === 0) {
                return "ok";
            }
            else return "error";
        })
        .catch(err => {
            return "error";
        })

export const registerUser = (data, refer) =>
    HTTP.post("api/user/register_user", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            toast.error(error);
            return error
        });

export const forgotPassword = data =>
    HTTP.post("api/user/forgot_password", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                toast.success(res.data.message);
                return res.data.message;
            } else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const getCollegeOptions = () =>
    HTTP.get("api/get_colleges", {
        headers: headers
    })
        .then(
            response => { return response.data; }
        ).catch(err => {
            //console.log(err);
            return null;
        })

export const googleLogin = data =>
    HTTP.post("api/user/login/google", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            //console.log(res);
            return res.data;
        })
        .catch(error => {
            return "error";
        });

export const facebookLogin = data =>
    HTTP.post("api/user/login/facebook", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return "error";
        });

export const passwordLogin = data =>
    HTTP.post("api/user/login/password", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return "error";
        });

export const getRegisteredEvents = data =>
    HTTP.post("api/user/get_registered_events", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                return res.data.message;
            }
            else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const deregisterMember = data =>
    HTTP.post("api/event/deregister_member", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                toast.success("Deregistered successfully.")
                return res.data.message;
            }
            else {
                toast.error(res.data.message)
                return "error";
            }
        })
        .catch(error => {
            toast.error(error)
            return "error";
        });

export const deregisterTeam = data =>
    HTTP.post("api/event/deregister_team", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                return res.data.message;
            } else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const submitComplaint = data =>
    HTTP.post("api/complaint/submit_complaint", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return "error";
        });

export const getComplaints = data =>
    HTTP.post("api/user/get_complaints", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                return res.data.message;
            }
            else if (res.data.code === 1) {
                return []
            }
            else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const cancelComplaint = data =>
    HTTP.post("api/user/cancel_complaint", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            //console.log(res.data);
            if (res.data.code === 0) {
                return res.data.message;
            }
            else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const updatePassword = data =>
    HTTP.post("api/user/update_password", JSON.stringify(data), {
        headers: headers
    }).then(res => {
        return res.data;
    })
        .catch(error => {
            return "error";
        })


// APIs RELATED TO EVENTS PAGE
export const getAllEventDetails = () =>
    HTTP.get("api/event/get_all_event_details")
        .then(res => {
            if (res.data.code === 0) return res.data.message;
            else {
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const getMembers = data =>
    HTTP.post("api/event/get_members", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) return res.data.message;
            else if (res.data.code === -1) {
                //toast.error("You are not the leader! Only leader can add a new member.");
                return "error";
            }
            else {
                //toast.error("Network error! Please try again.");
                return "error";
            }
        })
        .catch(error => {
            return "error";
        });

export const eventRegister = data =>
    HTTP.post("api/event/register", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            console.log(res.data.message)
            if (res.data.code === 0) {
                toast.success(res.data.message);
                return res.data.message;
            } else if (res.data.code === -4) {
                toast.error("Participant/s already registered For this event.");
                return "error";
            } else if (res.data.code === -5) {
                toast.error("Invalid member details. Enter valid SF ID - Email of members.");
                return "error";
            } else if (res.data.code === -2) {
                toast.error("Network error! Please try again.");
                return "error";
            } else {
                toast.error(res.data.message);
                return "error";
            }
        })
        .catch(error => {
            toast.error("Network error! Please try again.");
            return "error";
        });

export const addMember = data =>
    HTTP.post("api/event/add_member", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                toast.success(res.data.message);
                return res.data.message;
            } else if (res.data.code === -6) {
                toast.error("Team Size Requirement Not Fulfilled.");
                return "error";
            } else if (res.data.code === -8) {
                toast.error("You Need to be the Leader to Add Members.");
                return "error";
            } else if (res.data.code === -3) {
                toast.error(res.data.message);
                return "error";
            } else {
                toast.error("Network Error! Please try again.");
                return "error";
            }
        })
        .catch(error => {
            toast.error("Network Error! Please try again.");
            return "error";
        });

export const submitLink = data =>
    HTTP.post("api/user/submission", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                return res.data.message;
            }
            else return "error";
        })
        .catch(error => {
            return "error";
        })

export const getSubmittedLink = data =>
    HTTP.post("api/user/get_submission", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                return res.data.message;
            }
            else return "error";
        })
        .catch(error => {
            //console.log(error);
            return "error";
        })

export const probableRegister = data =>
    HTTP.post("api/event/probable_register", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            if (res.data.code === 0) {
                toast.success(res.data.message);
                return res.data.message;
            } else {
                toast.error(res.data.message);
                return "error";
            }
        })
        .catch(error => {
            toast.error(error);
            return "error";
        });
