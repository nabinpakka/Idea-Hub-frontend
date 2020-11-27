import React,{useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
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

    // let history = useHistory();
    // let location = useLocation();
    // let {from } = location.state || {from:{pathname: "/dashboard"}}
    // function onLogin(){
    //     history.replace(from)
    //
    // }

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
