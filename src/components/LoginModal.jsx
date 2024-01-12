import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleLogin } from "@react-oauth/google";
import createToast from "../utils/createToast.js";


export default function LoginModal({
    isOpen,
    handleModalClose,
    showSignupSection,
    showForgotPassword,
    showForgotPasswordSection,
}) {
    const { setSignupdata, setUser, setIsLoggedIn } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required!"),
            password: Yup.string().required("Required!"),
        }),
        onSubmit: async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    "https://mainapi.springfest.in/api/user/login/password",
                    {
                        email: formik.values.email,
                        password: formik.values.password,
                    }
                );

                if (response.data.code === 0) {
                    console.log("Login successful", response.data.message);
                    createToast("Login Successful", "success");

                    setSignupdata(response.data);
                    setIsLoggedIn(true);
                    setUser(response.data.message);

                    localStorage.setItem(
                        "userData",
                        JSON.stringify(response.data.message)
                    );

                    handleModalClose();
                    setLoading(false);
                } else {
                    console.error("Login failed:", response.data.message);
                    createToast("Login Failed", "error");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Login failed:", error);
                createToast("Login Failed", "error");
                await setLoading(false);
            }
        },
    });

    const handleGoogleLogin = async (googleSignInResponse) => {
        try {
            const token = googleSignInResponse.credential;
            axios
                .post("https://mainapi.springfest.in/api/user/login/google", {
                    token,
                })
                .then((res) => {
                    if (res.data.code === 0) {
                        console.log("response ", res.data.message);
                        createToast("Login Successful", "success");
                        setSignupdata(res.data);
                        setUser(res.data.message);

                        localStorage.setItem(
                            "userData",
                            JSON.stringify(res.data.message)
                        );

                        setIsLoggedIn(true);
                        handleModalClose();
                    }
                    else {
                        createToast(res.data.message, "error")
                    }
                });
        } catch (error) {
            createToast("Login Failed", "error");
        }
    };

    return (
        <div className={`login-modal ${isOpen ? "open" : ""}`}>
            <div className="modal-content login-box">
                <CloseIcon
                    className="login-close"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handleModalClose}
                />
                <h2>Log In</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="user-box">
                        <input
                            type="email"
                            id="email"

                            // value={email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // onChange={handleEmailChange}
                            required
                        />
                        <label>Email</label>
                        {formik.errors.email && formik.touched.email ? (
                            <p
                                style={{
                                    color: "red",
                                    fontSize: "small",
                                    textAlign: "right",
                                }}
                            >
                                {formik.errors.email}
                            </p>
                        ) : null}
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            id="password"

                            // value={password}
                            // onChange={handlePasswordChange}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        <label>Password</label>
                        {formik.errors.password && formik.touched.password ? (
                            <p
                                style={{
                                    color: "red",
                                    fontSize: "small",
                                    textAlign: "right",
                                }}
                            >
                                {formik.errors.password}
                            </p>
                        ) : null}
                    </div>
                    <button type="submit" className="submit-button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sign In
                    </button>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleGoogleLogin(credentialResponse);
                        }}
                        onError={() => {
                            createToast("Login Failed", "error");
                        }}
                    />
                </form>

                <div className="signup-button-div">
                    <button
                        className="signup-button"
                        onClick={showSignupSection}
                    >
                        Don't have an account? <span>SIGN UP</span>
                    </button>

                    {!showForgotPassword && (
                        <button
                            className="update_password"
                            onClick={showForgotPasswordSection}
                        >
                            <span>Forgot Password?</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};