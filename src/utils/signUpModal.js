import React, { useState } from "react";

const SignUpModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleYearOfPassingChange = (e) => {
    setYearOfPassing(e.target.value);
  };

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      dob,
      phone,
      college,
      state,
      city,
      yearOfPassing,
      securityQuestion,
      securityAnswer,
      gender,
      password,
      confirmPassword,
    };

    postData("https://mainapi.springfest.in/api/user/register_user", data)
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }

  return (
    <div className={`signup-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="Date"
              value={dob}
              onChange={handleDobChange}
              required
            />
            <label>Dob</label>
          </div>
          <div className="user-box">
            <input
              type="Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <label>Phn-Number</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={college}
              onChange={handleCollegeChange}
              required
            />
            <label>Collge</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={state}
              onChange={handleStateChange}
              required
            />
            <label>State</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              required
            />
            <label>City</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={yearOfPassing}
              onChange={handleYearOfPassingChange}
              required
            />
            <label>Year of Passing</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={securityQuestion}
              onChange={handleSecurityQuestionChange}
              required
            />
            <label>Security Question</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={securityAnswer}
              onChange={handleSecurityAnswerChange}
              required
            />
            <label>Security Answer</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={gender}
              onChange={handleGenderChange}
              required
            />
            <label>Gender</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <label>Confirm Password</label>
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

export default SignUpModal;
