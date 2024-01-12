import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const enteredEmail = email.trim();

        if (!validateEmail(enteredEmail)) {
            console.log("Invalid email");
            return;
        }

        console.log("Email submitted:", enteredEmail);
        onClose();
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className={`login-modal ${isOpen ? "open" : ""}`}>
            <div className="modal-content login-box">
                <CloseIcon
                    className="login-close"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={onClose}
                />
                <h2>Forgot Password</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="user-box">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>

                    <button type="submit" className="submit-button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
