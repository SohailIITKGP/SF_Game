import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { useState, useEffect } from "react";
import UserContextProvider from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
// import Preloader from "./components/preloader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
    <GoogleOAuthProvider clientId="796984984720-4lodecotte9rcqnbdtkpdjaqbdp92e0j.apps.googleusercontent.com">
        <UserContextProvider>
            <Router>
                <App />
             </Router>
        </UserContextProvider>
    </GoogleOAuthProvider>
);


