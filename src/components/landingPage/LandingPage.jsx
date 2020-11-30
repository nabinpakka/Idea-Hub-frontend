import React, {useEffect, useState} from 'react';

import Logo from "../utilities/Logo";
import Login from "./Login";
import Quotes from "./Quotes";

// //this modal works
// import Modal from 'react-modal';
import SignUp from "./SignUp";

// Modal.setAppElement("#dialog")
function LandingPage() {

    const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

    function openSignUpDialog() {
        setIsSignUpDialogOpen(true);
    }

    useEffect(()=>{
        //checking if user is already logged in
        //if user is already logged in then local storage should contain jwt

        //as the jwt stored locally, it persists even after termination of program without calling logout
        //will replace it with apicontext state

        let jwt = localStorage.getItem("jwt");
        console.log(jwt)
        if(jwt !==null && jwt!==""){
            //the user is already logged in so direct him to dashboard
            window.location = "/dashboard/home"
        }
    },[])

    return (
        <div style={{
            background: "#2f3038",
            height: '100%',
            width: '100%'
        }}
        >
            <Logo/>
            <div>
                <div id={'dialog'} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent:'center',
                    marginTop: '7%',
                    height: '100vh',

                }}>
                    <Quotes/>
                    <Login signUpHandler={openSignUpDialog}/>
                    <SignUp isSignUpDialogOpen={isSignUpDialogOpen} setIsSignUpDialogOpen={setIsSignUpDialogOpen}/>
                </div>

            </div>

        </div>
    )
}
export default LandingPage;
