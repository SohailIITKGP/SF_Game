import { useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.js";
import Payment from "../Contingent/Payment.jsx";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "../../styles/PaymentIndividual.css";
import createToast from "../../utils/createToast";
import { useNavigate } from "react-router-dom";

const PaymentIndividual = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [accomodationType, setAccomodationType] = useState("Common");
  const [typeOfPayment, setTypeOfPayment] = useState("Individual");

  const payment_body = {
    token: user.token,
    check_in: checkin,
    check_out: checkout,
    emergency_number: emergencyContact,
    type_of_payment: typeOfPayment,
    type_of_acco: accomodationType,
  };
  console.log(payment_body)

  return (
    <>
      <div className="contingent-member-payment-modal-1">
        <div className="contingent-member-payment-modal-content-1">
          <Link to="/dashboard">
            <CloseIcon
              className="close-payment"
              style={{ color: "white", cursor: "pointer" }}
            />
          </Link>

          <h2 className="contingent-member-payment-modal-content-heading-1">
            Payment
          </h2>
          <div className="contingent-member-payment-modal-checkin-1">
            <select
              placeholder="Check In Date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              required
            >
              <option value="" label="Check In Date" />
              <option value="2024-01-23">23-01-2024</option>
              <option value="2024-01-24">24-01-2024</option>
              <option value="2024-01-25">25-01-2024</option>
              <option value="2024-01-26">26-01-2024</option>
              <option value="2024-01-27">27-01-2024</option>
              <option value="2024-01-28">28-01-2024</option>
            </select>
          </div>
          <div className="contingent-member-payment-modal-checkout-1">
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
            {/* <label htmlFor="">Check Out Date</label> */}
          </div>
          <div className="contingent-member-payment-modal-emergency-number-1">
            <input
              type="number"
              value={emergencyContact}
              placeholder="Emergency Phone Number"
              onChange={(e) => setEmergencyContact(e.target.value)}
              required
            />
          </div>
          {/* <div className="contingent-member-payment-modal-content-accomodation-options-1">
              <select
                placeholder="Enter the Accomodation Type"
                value={accomodationType}
                onChange={(e) => setAccomodationType(e.target.value)}
                required
              >
                <option value="" label="Enter Accomodation Type"></option>
                <option value="Single">Single Room</option>
                <option value="Common">Common Room</option>
              </select>
            </div> */}
          <div className="contingent-member-payment-modal-content-button-1">
            <button onClick={() => Payment(payment_body)}>Pay</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentIndividual;
