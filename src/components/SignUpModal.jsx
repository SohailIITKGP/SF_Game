import React, { useState, useEffect, useContext } from "react";
import "../styles/signup.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from "../context/userContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import CloseIcon from "@mui/icons-material/Close";
import data from "../utils/city.json";
import createToast from "../utils/createToast.js";

// import { placeholder } from '@babel/types';

const SignupModal = ({ isOpen, closeLoginModal, onClose }) => {
  const handleMobileChange = (event) => {
    const inputValue = event.target.value;
    // Truncate the value to 10 digits
    const truncatedValue = inputValue.slice(0, 10);
    // Update the form field with the truncated value
    formik.setFieldValue("mobile", truncatedValue);
  };
  const { setSignupdata, setIsLoggedIn, setUser } = useContext(UserContext);

  const [dobPlaceholderVisible, setDobPlaceholderVisible] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);

  //  console.log("signupdata is ",Signupdata);
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const phoneRegExp = /^[0-9]{10}$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      security_Qn: "",
      security_Ans: "",
      dob: "",
      gender: "",
      college: "",
      yop: "",
      mobile: "",
      city: "",
      state: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      security_Qn: Yup.string().required("Required!"),
      security_Ans: Yup.string().required("Required"),
      mobile: Yup.string()
        .matches(phoneRegExp, "Invalid Phone Number!")
        .required("Required!"),
      college: Yup.string().required("Required!"),
      dob: Yup.string().required("Required!"),
      gender: Yup.string().required("Required!"),
      yop: Yup.string().required("Required!"),
      city: Yup.string().required("Required!"),
      state: Yup.string().required("Required!"),
      password: Yup.string()
        .min(8, "Must be atleast 8 characters long!")
        .required("Required!"),
      confirmPass: Yup.string()
        .min(8, "Must be atleast 8 characters long")
        .oneOf([Yup.ref("password")], "Password does not match!")
        .required("Required!"),
    }),

    onSubmit: (values) => {
      console.log("the value is", values);
    },
  });
  // console.log(formik.errors);
  // console.log(formik.values);

  function onChange(value) {
    setIsCaptchaSuccess(true);
    setCaptcha(value);
    console.log("captcha value: ", value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formik.isValid && formik.dirty) {
      try {
        const response = await axios.post(
          "https://mainapi.springfest.in/api/user/register_user",
          {
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
            security_qn: formik.values.security_Qn,
            security_ans: formik.values.security_Ans,
            dob: formik.values.dob,
            gender: formik.values.gender,
            college: formik.values.college,
            yop: formik.values.yop,
            mobile: formik.values.mobile,
            city: formik.values.city,
            state: formik.values.state,
            captcha,
          }
        );

        if (response.data.code === 0) {
          console.log("the data is", response.data);
          setSignupdata(response.data);
          setIsLoggedIn(true);
          createToast("Signup Successful", "success");
          onClose();
          closeLoginModal();
          setUser(response.data.message);
        } else {
          console.error("Signup failed:", response.data.message);
          for(let key in response.data.message)
          {
            console.log("signup error", response.data.message[key][0]);
            createToast(response.data.message[key][0], "error");
          }
          // createToast("", "error");
          setErrors({ server: ["Signup failed. Please try again."] });
        }
      } catch (error) {
        console.error("Error during signup:", error);
        createToast( error.message,"error");
        setErrors({
          server: ["An unexpected error occurred. Please try again."],
        });
      }
    } else {
      // Set formik errors to display any validation errors
      formik.setTouched({
        name: true,
        email: true,
        security_Qn: true,
        security_Ans: true,
        dob: true,
        gender: true,
        college: true,
        yop: true,
        mobile: true,
        city: true,
        state: true,
      });
    }
  };
  const handleClose = () => onClose();

  const [statecity, setStatecity] = useState([]);
  useEffect(() => {
    data.states.forEach((element) => {
      if (formik.values.state === element.state) {
        setStatecity(element.districts);
      }
    });
  }, [formik.values.state]);

  return (
    <div className={`signup-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content signup-box">
        <CloseIcon
          className="signup-close"
          style={{ color: "white", cursor: "pointer" }}
          onClick={handleClose}
        />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="details-sigunp">Personal Information</h3>
          <div className="user-box">
            <input
              type="text"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // onClick={()=>{document.getElementById("name").placeholder = "hiii"}}

              required
            />
            <label>Name</label>
            {formik.errors.name && formik.touched.name ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.name}
              </p>
            ) : null}
            {errors.name && <div className="error">{errors.name[0]}</div>}
          </div>
          <div className="user-box">
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Email</label>
            {formik.errors.email && formik.touched.email ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.email}
              </p>
            ) : null}
            {errors.email && <div className="error">{errors.email[0]}</div>}
          </div>

          {/* Mobile */}
          <div className="user-box">
            <input
              type="number"
              id="mobile"
              maxLength="10"
              value={formik.values.mobile}
              // onChange={formik.handleChange}
              onChange={(e) => {
                formik.handleChange(e);
                handleMobileChange(e);
              }}
              onBlur={formik.handleBlur}
              required
            />
            <label>Mobile</label>
            {formik.errors.mobile && formik.touched.mobile ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.mobile}
              </p>
            ) : null}
            {errors.mobile && <div className="error">{errors.mobile[0]}</div>}
          </div>

          <div className="user-box">
            <input
              
              type="date"
              id="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // placeholder='dd-mm-yyyy'
              required
            />
            <label>Date of Birth</label>

            {formik.errors.dob && formik.touched.dob ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.dob}
              </p>
            ) : null}
            {errors.dob && <div className="error">{errors.dob[0]}</div>}
          </div>

          {/* Gender */}
          <div className="user-box">
            <select
              type="text"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="M/F"
              required
            >
              <option value label="Select your gender" />
              <option style={{ color: "black" }}>M</option>
              <option style={{ color: "black" }}>F</option>
            </select>

            <label>Gender</label>
            {formik.errors.gender && formik.touched.gender ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.gender}
              </p>
            ) : null}
            {errors.gender && <div className="error">{errors.gender[0]}</div>}
          </div>

          {/* College */}
          <h3 className="details-sigunp"> College Information </h3>
          <div className="user-box">
            <input
              type="text"
              id="college"
              value={formik.values.college}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>College</label>
            {formik.errors.college && formik.touched.college ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.college}
              </p>
            ) : null}
            {errors.college && <div className="error">{errors.college[0]}</div>}
          </div>

          {/* Year of Passing */}
          <div className="user-box">
            <select
              type="text"
              id="yop"
              value={formik.values.yop}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="yyyy"
              required
            >
              <option value label="Select year of passing" />
              <option style={{ color: "black" }}>2024</option>
              <option style={{ color: "black" }}>2025</option>
              <option style={{ color: "black" }}>2026</option>
              <option style={{ color: "black" }}>2027</option>
              <option style={{ color: "black" }}>2028</option>
              <option style={{ color: "black" }}>2029</option>
              <option style={{ color: "black" }}>2030</option>
              <option style={{ color: "black" }}>2031</option>
            </select>
            <label>Year of Graduation</label>
            {formik.errors.yop && formik.touched.yop ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.yop}
              </p>
            ) : null}
            {errors.yop && <div className="error">{errors.yop[0]}</div>}
          </div>

          {/* State */}
          <div className="user-box">
            <select
              type="text"
              id="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option
                value=""
                label="Select your State"
                style={{ color: "gray" }}
              />
              {data.states.map((e) => {
                return (
                  <option
                    value={e.state}
                    label={e.state}
                    style={{ color: "black" }}
                  >
                    {e.state}
                  </option>
                );
              })}
            </select>
            <label>State</label>
            {formik.errors.state && formik.touched.state ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.state}
              </p>
            ) : null}
            {errors.state && <div className="error">{errors.state[0]}</div>}
          </div>

          {/* City */}
          <div className="user-box">
            <select
              type="text"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option
                value=""
                label="Select your City"
                style={{ color: "gray" }}
              />
              {statecity.map((ele) => {
                return (
                  <option value={ele} label={ele} style={{ color: "black" }}>
                    {ele}
                  </option>
                );
              })}
            </select>
            <label>City</label>
            {formik.errors.city && formik.touched.city ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.city}
              </p>
            ) : null}
            {errors.city && <div className="error">{errors.city[0]}</div>}
          </div>
          <h3 className="details-sigunp"> Account Credentials</h3>
          <div className="user-box">
            <input
              type="password"
              id="password"
              textAlign="left"
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
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.password}
              </p>
            ) : null}
            {errors.password && (
              <div className="error">{errors.password[0]}</div>
            )}
          </div>
          <div className="user-box">
            <input
              type="password"
              id="confirmPass"
              value={formik.values.confirmPass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Confirm Password</label>
            {formik.errors.confirmPass && formik.touched.confirmPass ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.confirmPass}
              </p>
            ) : null}
            {errors.confirmPass && (
              <div className="error">{errors.confirmPass[0]}</div>
            )}
          </div>

          <div className="user-box">
            <input
              type="text"
              id="security_Qn"
              value={formik.values.security_Qn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Security Question</label>
            {formik.errors.security_Qn && formik.touched.security_Qn ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.security_Qn}
              </p>
            ) : null}
            {errors.security_Qn && (
              <div className="error">{errors.securityQn[0]}</div>
            )}
          </div>
          <div className="user-box">
            <input
              type="text"
              id="security_Ans"
              value={formik.values.security_Ans}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Security Answer</label>
            {formik.errors.security_Ans && formik.touched.security_Ans ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "right",
                  marginTop: "0px",
                }}
              >
                {formik.errors.security_Ans}
              </p>
            ) : null}
            {errors.security_Ans && (
              <div className="error">{errors.securityAns[0]}</div>
            )}
          </div>
          {/* Include similar blocks for other form fields */}

          <div className="user-box">
            <ReCAPTCHA
              className="captchas"
              id="captcha"
              sitekey="6Lco6EQpAAAAAC52ZX9PY_ryDjDcGp6uhIi8iKIJ"
              onChange={onChange}
              theme="dark"
            />
            {errors.captcha && <div className="error">{errors.captcha[0]}</div>}
          </div>
          <button
            type="submit"
            disabled={!isCaptchaSuccessful}
            className="submit-button"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign Up
          </button>
        </form>
        <button className="signin-button" onClick={handleClose}>
          Already have account? <span>SIGN IN</span>
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
