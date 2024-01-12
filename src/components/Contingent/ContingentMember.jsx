import { UserContext } from "../../context/userContext.js";
import { useContext } from "react";
import { useState } from "react";
import "../../styles/ContingentMember.css";
import CloseIcon from "@mui/icons-material/Close";
import Payment from "./Payment.jsx";
import "../../styles/Contingent.css";
import "../../styles/ContingentLeader.css";
import "../../styles/ContingentMember.css";

const ContingentMember = ({
    contingentmembers,
    setContingentmembers,
    contingentMembersPaymentStatus,
    setContingentMembersPaymentStatus,
    contingentMembersName,
    setContingentMembersName,
    LeaveContingent,
    leaderId,
    leaderName,
}) => {
    const { user, contingentdata } = useContext(UserContext);
    const [contingentpaymentmodal, setContingentPaymentModal] = useState(false);

    const [checkin, setCheckin] = useState();
    const [checkout, setCheckout] = useState();
    const [emergencyContact, setEmergencyContact] = useState("");
    const [accomodationType, setAccomodationType] = useState("Common");
    const [typeOfPayment, setTypeOfPayment] = useState("");

    const payment_body = {
        token: user.token,
        check_in: checkin,
        check_out: checkout,
        emergency_number: emergencyContact,
        type_of_payment: typeOfPayment,
        type_of_acco: accomodationType,
    };
    // console.log(payment_body)
    // console.log("naam hai", leaderName);

    const paidIndividually = contingentdata.updatedMembersInfo.filter(
        (member) => member.id === user.id
    )[0].paymentStatus;

    return (
        <div className="contingent-member" style={{ color: "white" }}>
            <div className="contingent-member-payment-button">
                {!paidIndividually && (
                    <button
                        className="px-4"
                        onClick={() => {
                            setContingentPaymentModal(true);
                            setTypeOfPayment("Individual");
                            setAccomodationType("Common");

                        }}
                    >
                        Individual Payment
                    </button>
                )}
            </div>
            <div className="leave-contingent-button">
                {contingentdata ? (
                    // && contingentdata.length !== 0
                    <button onClick={() => LeaveContingent()}>
                        Leave Contingent
                    </button>
                ) : (
                    console.log(contingentdata)
                )}
            </div>

            <div className="contingent-leader-details">
                <div className="contingent-leader-name">
                    LEADER: {leaderName}
                </div>
                <div className="contingent-leader-id">
                    SF{leaderId}
                </div>
            </div>

            <div className="user-contingent-members-details">
                <div className="user-contingent-members-heading">
                    {/* <div className="user-contingent-members">Contingent Members</div>
          <div className="user-contingent-members">Members SF ID</div> */}
                </div>
                <div className="user-contingent-members-list">
                    {!contingentmembers || contingentmembers.length === 0 ? (
                        <div className="user-contingent-members-item">
                            No Contingent Joined
                        </div>
                    ) : (
                        contingentmembers &&
                        contingentmembers.map((member, index) => {
                            return (
                                <div
                                    className="user-contingent-members-item"
                                    key={index}
                                >
                                    <div className="user-contingent-members-item-name">
                                        {contingentMembersName[index]}
                                    </div>
                                    <div>{member}</div>
                                    <div className={`user-contingent-members-item-payment-status ${contingentMembersPaymentStatus[index] ? "payment-done" : "payment-not-done"}`}>
                                        {contingentMembersPaymentStatus[index]
                                            ? "Paid"
                                            : "Unpaid"}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {contingentpaymentmodal && (
                <div className="contingent-member-payment-modal">
                    <div className="contingent-member-payment-modal-content">
                        <CloseIcon
                            className="close-payment"
                            style={{ color: "white", cursor: "pointer" }}
                            onClick={() => setContingentPaymentModal(false)}
                        />

                        <h2 className="contingent-member-payment-modal-content-heading">
                            Payment
                        </h2>
                        <div className="contingent-member-payment-modal-checkin">
                            <select
                                placeholder="Check In Date"
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                                required
                            >
                                <option value="2024-01-23">23-01-2024</option>
                <option value="2024-01-24">24-01-2024</option>
                <option value="2024-01-25">25-01-2024</option>
                <option value="2024-01-26">26-01-2024</option>
                <option value="2024-01-27">27-01-2024</option>
                <option value="2024-01-28">28-01-2024</option>
                            </select>
                        </div>
                        <div className="contingent-member-payment-modal-checkout">
                            <select
                                placeholder="Check Out Date"
                                required
                                value={checkout}
                                onChange={(e) => setCheckout(e.target.value)}
                            >
                                <option value="" label="Check Out date" />
                <option value="2024-01-26">26-01-2024</option>
                <option value="2024-01-27">27-01-2024</option>
                <option value="2024-01-28">28-01-2024</option>
                <option value="2024-01-29">29-01-2024</option>
                <option value="2024-01-30">30-01-2024</option>
                            </select>
                        </div>
                        <div className="contingent-member-payment-modal-emergency-number">
                            <input
                                type="number"
                                value={emergencyContact}
                                onChange={(e) =>
                                    setEmergencyContact(e.target.value)
                                }
                            />
                        </div>

                        {/* <div className="contingent-member-payment-modal-content-accommodation-options">
                            <select
                                value={accomodationType}
                                onChange={(e) =>
                                    setAccomodationType(e.target.value)
                                }
                            >
                                <option value label="Enter Accomodation Type" />
                                <option value="Single">Single</option>
                                <option value="Common">Common</option>
                            </select>
                        </div> */}
                        <div className="contingent-member-payment-modal-content-button">
                            <button onClick={() => Payment(payment_body)}>
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContingentMember;
