import { useState, useContext } from "react";
import { UserContext } from "../context/userContext.js";

import SignUpModal from "../components/SignUpModal.jsx";
import ForgotPasswordModal from "../components/ForgotPasswordModal.jsx";
import LoginModal from "../components/LoginModal.jsx";


const LoginPage = ({ isOpen, onClose }) => {
    
    const [showSignup, setShowSignup] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

    const handleModalClose = () => onClose();

    const showSignupSection = () => {
        setShowSignup(true);
        setShowForgotPassword(false);
    };

    const showForgotPasswordSection = () => {
        setShowForgotPassword(true);
        setShowSignup(false);
    };
    const handleBackToLogin = () => {
        setShowForgotPassword(false);
        setShowSignup(false);
    };

    return (
        <>
            {!showSignup && !showForgotPassword ? (
                <LoginModal
                    isOpen={isOpen}
                    handleModalClose={handleModalClose}
                    showSignupSection={showSignupSection}
                    showForgotPassword={showForgotPassword}
                    showForgotPasswordSection={showForgotPasswordSection}
                />
            ) : showSignup ? (
                <SignUpModal
                    isOpen={true}
                    closeLoginModal={handleModalClose}
                    onClose={() => {
                        setShowSignup(false);
                        if (isLoggedIn) handleModalClose();
                    }}
                />
            ) : (
                <ForgotPasswordModal
                    isOpen={true}
                    onClose={() => {
                        setShowForgotPassword(false);
                        if (isLoggedIn) handleModalClose();
                    }}
                    onBackToLogin={handleBackToLogin}
                />
            )}
        </>
    );
};

export default LoginPage;