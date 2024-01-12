import { useEffect, useState } from "react";
import "../../styles/Contingent.css";
import "../../styles/ContingentLeader.css";
import ContingentMember from "./ContingentMember";
import ContingentLeader from "./ContingentLeader";
import axios from "axios";
import createToast from "../../utils/createToast";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CleaningServices } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";

const Contingent = () => {
    const navigate = useNavigate();
    const { user, contingentdata, setContingentdata } = useContext(UserContext);
    const [contingentid, setContingentid] = useState("");
    const [contingentcode, setContingentcode] = useState("");
    const [contingentname, setContingentname] = useState("");

    const [joincontingentform, setjoincontingentform] = useState(true);
    const [contingentcreateform, setcontingentcreateform] = useState(false);

    const [joincontengentpayment, setjoincontengentpayment] = useState(false);
    const [createcontengentpayment, setcreatecontengentpayment] =
        useState(false);

    const [contingentmembers, setContingentmembers] = useState([]);
    const [contingentMembersPaymentStatus, setContingentMembersPaymentStatus] =
        useState([]);
    const [contingentMembersName, setContingentMembersName] = useState([]);
    const [leaderId, setLeaderId] = useState("");

    const [leaderName, setLeaderName] = useState("");

    const contingentjoinfunction = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://acco.springfest.in/api/contingent/join",
                {
                    token: user.token,
                    contingent_id: contingentid,
                    contingent_code: contingentcode,
                }
            );
            if (response.data.code === 0) {
                setjoincontingentform(false);
                setcontingentcreateform(false);
                setjoincontengentpayment(true);
                createToast(response.data.message, "success");
                console.log(response.data);
            }else if(response.data.code===1 &&response.data.message==="Token Not Recieved"){
				createToast("Please Login to create Contingent", "error");
			}  else if (
                response.data.code === 2 &&
                response.data.message === "Unauthorized"
            ) {
                createToast("Please Login and Logout again", "error");
            } else if (response.data.code === 2) {
                createToast(response.data.message, "error");
                console.log(response.data);
            } else {
                createToast(response.data.message, "warning");
                console.log(response.data);
            }
        } catch (err) {
            createToast("Could not join contingent", "error");
            console.log(err);
        }
    };

    const contingentcreatefunction = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://acco.springfest.in/api/contingent",
                {
                    token: user.token,
                    contingent_name: contingentname,
                }
            );
            if (response.data.code === 0) {
                setjoincontingentform(false);
                setcontingentcreateform(false);
                setcreatecontengentpayment(true);
                createToast(response.data.message, "success");
                // console.log("trgevbr", response);
                setContingentid(contingentid);
                setContingentcode(contingentcode);
            }else if(response.data.code===1 &&response.data.message==="Token Not Recieved"){
				createToast("Please Login to create Contingent", "error");
			}  else if (
                response.data.code === 2 &&
                response.data.message === "Unauthorized"
            ) {
                createToast("Please Login and Logout again", "error");
            } else if (response.data.code === 2) {
                createToast(response.data.message, "error");
                console.log(response.data);
            } else {
                console.log(response);

                createToast(response.data.message, "warning");
                console.log(response.data.message);
            }
        } catch (err) {
            createToast("Could not create contingent", "error");
            console.log(err);
        }
    };

    const fetchContingentDetails = async () => {
        const res = await axios.post(
            "https://acco.springfest.in/api/contingent/getMembers",
            {
                token: user.token,
            }
        );
        if (res.data.code === 0) {
            setContingentmembers(
                res.data.data.updatedMembersInfo.map((member) => member.sf_id)
            );
            setContingentMembersPaymentStatus(
                res.data.data.updatedMembersInfo.map(
                    (member) => member.paymentStatus
                )
            );
            setContingentMembersName(
                res.data.data.updatedMembersInfo.map((member) => member.name)
            );
            setLeaderId(res.data.data.leaderId);

            setContingentdata(res.data.data);

            for (let member of res.data.data.updatedMembersInfo) {
                if (member.id === res.data.data.leaderId) {
                    setLeaderName(member.name);
                }
            }

            setjoincontengentpayment(true);
            setjoincontingentform(false);
            setContingentid(res.data.data.id);
            setContingentcode(res.data.data.code);
            setcontingentcreateform(false);
            setcreatecontengentpayment(true);
            setContingentdata(res.data.data);
            // console.log(res.data.data);
        } else {
            setContingentdata(null);
        }
    };

    const LeaveContingent = async () => {
        try {
            const response = await axios.post(
                "https://acco.springfest.in/api/contingent/leave",
                {
                    token: user.token,
                }
            );
            if (response.data.code === 0) {
                setjoincontingentform(true);
                setcontingentcreateform(true);
                setcreatecontengentpayment(false);
                setjoincontengentpayment(false);
                createToast(response.data.message, "success");
                // console.log(response.data.message);
                setContingentdata(null);
                setContingentmembers([]);
                setContingentMembersPaymentStatus([]);
                setContingentMembersName([]);
                setLeaderId("");
                setLeaderName("");
                setContingentid("");
                setContingentcode("");
                navigate("/accommodation");
            } else {
                console.log(response.code);
                createToast(response.data.message, "warning", 6);
                console.log(response.data.message);
            }
        } catch (err) {
            createToast("Could not leave contingent", "error", 6)
            console.log(err);
        }
        fetchContingentDetails();
    };

    useEffect(() => {
        const Interval = setInterval(() => {
            fetchContingentDetails();
        }, 1000);

        return () => clearInterval(Interval);
    }, []);

    // useEffect(() => {
    //   fetchContingentDetails();
    // }, [contingentjoinfunction, contingentcreatefunction, LeaveContingent]);

    return (
        <>
            <div className="contigent-container">
                <h3>Contingent</h3>
                {!joincontengentpayment && !createcontengentpayment && (
                    <div className="contingent-buttons">
                        <button
                            onClick={() => {
                                setjoincontingentform(true);
                                setcontingentcreateform(false);
                            }}
                        >
                            Join Contingent
                        </button>
                        <button
                            onClick={() => {
                                setjoincontingentform(false);
                                setcontingentcreateform(true);
                            }}
                        >
                            Create Contingent
                        </button>
                    </div>
                )}

        {joincontingentform &&
          !contingentcreateform &&
          !joincontengentpayment &&
          (!contingentmembers || contingentmembers.length === 0) && (
            <div className="contingent-form-container">
              <form
                styles={{ color: "black" }}
                className="contigent-form"
                onSubmit={(e) => contingentjoinfunction(e)}
              >
                <div className="contengent-join-form-heading">
                  Join a Contingent
                </div>
                <div className="contingent-id-input">
                  <input
                    type="text"
                    value={contingentid}
                    onChange={(e) => setContingentid(e.target.value)}
                  />
                  <label
                    className={`contingent-id-input-content ${contingentid && "focused"
                      }`}
                  >
                    Enter contingent id
                  </label>
                </div>
                <div className="contingent-code-input">
                  <input
                    type="text"
                    value={contingentcode}
                    onChange={(e) => setContingentcode(e.target.value)}
                  />
                  <label
                    className={`contingent-code-input-content ${contingentcode && "focused"
                      }`}
                  >
                    Enter contingent code
                  </label>
                </div>
                <button type="submit" className="submit-button">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Join
                </button>
              </form>
            </div>
          )}

                {!joincontingentform &&
                    contingentcreateform &&
                    !createcontengentpayment &&
                    (!contingentmembers || contingentmembers.length === 0) && (
                        <div className="contingent-form-container">
                            <form
                                className="contigent-form"
                                onSubmit={(e) => contingentcreatefunction(e)}
                            >
                                <div className="contengent-join-form-heading">
                                    Create a Contingent
                                </div>
                                <div className="contingent-id-input">
                                    <input
                                        type="text"
                                        value={contingentname}
                                        onChange={(e) =>
                                            setContingentname(e.target.value)
                                        }
                                    />
                                    <label
                                        className={`contingent-id-input-content ${
                                            contingentname && "focused"
                                        }`}
                                    >
                                        Name for your Contingent
                                    </label>
                                </div>
                                <button className="submit-button" type="submit">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Create
                                </button>
                            </form>
                        </div>
                    )}

                {parseInt(user.id) !== parseInt(leaderId) &&
                    contingentmembers &&
                    contingentmembers.length > 0 &&
                    joincontengentpayment && (
                        <ContingentMember
                            contingentMembersPaymentStatus={
                                contingentMembersPaymentStatus
                            }
                            setContingentMembersPaymentStatus={
                                setContingentMembersPaymentStatus
                            }
                            contingentMembersName={contingentMembersName}
                            setContingentMembersName={setContingentMembersName}
                            contingentmembers={contingentmembers}
                            setContingentmembers={setContingentmembers}
                            LeaveContingent={LeaveContingent}
                            leaderId={leaderId}
                            leaderName={leaderName}
                        />
                    )}

                {parseInt(user.id) === parseInt(leaderId) &&
                    contingentmembers &&
                    contingentmembers.length > 0 &&
                    createcontengentpayment && (
                        <ContingentLeader
                            contingentcode={contingentcode}
                            contingentid={contingentid}
                            contingentMembersPaymentStatus={
                                contingentMembersPaymentStatus
                            }
                            setContingentMembersPaymentStatus={
                                setContingentMembersPaymentStatus
                            }
                            contingentMembersName={contingentMembersName}
                            setContingentMembersName={setContingentMembersName}
                            contingentmembers={contingentmembers}
                            setContingentmembers={setContingentmembers}
                            LeaveContingent={LeaveContingent}
                        />
                    )}
            </div>
        </>
    );
};

export default Contingent;
