import axios from 'axios';
import { useEffect, useState } from 'react';
import { string } from 'yup';

export default function TrafficRunner() {
    const [authtoken,setAuthtoken]=useState();
    const [ismaped,setIsmapped]=useState(false);

//event listener to set localstorage value of key authtoken.
    useEffect(() => {
       const receiveMessage = (event) => {
            const expectedOrigin = 'http://localhost:55329';
            console.log("origin of game",event.origin);
            if (event.origin !== expectedOrigin) {
                console.log("Unexpected origin. Ignoring message.");
                return;
            }
            console.log("Data from WebGL game:", event.data);
            let authto = (event.data.authToken);
            setAuthtoken(authto);
        };
        window.addEventListener("message", receiveMessage);
        return () => {
            window.removeEventListener("message", receiveMessage);
        };
    }, []);


let userdata = localStorage.getItem("userData");

useEffect(() => {
    const fetchData = async () => {
        if (authtoken && localStorage.getItem("authtoken")==null) {
            localStorage.setItem("authtoken", authtoken);
            let userDataObject = JSON.parse(userdata);
            if (userDataObject) {
                let sfId = userDataObject.sf_id;
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/sfId2authtoken",
                        {
                            sfId: sfId,
                            authToken: authtoken,
                        }
                    );

                    if (response.data.code === 0) {
                        console.log(response.data);
                    } 
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
   
    fetchData();
    setIsmapped(true);
}, [authtoken, userdata]);



    return (
        <>
            <button>Dashboard</button>
            <iframe
                src="http://localhost:55329"
                title='game'
                style={{
                    border: "0",
                    width: "100vw",
                    height: "100vh",
                }}
            ></iframe>
        </>
    );
}
