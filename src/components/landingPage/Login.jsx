import React, {useContext, useState} from 'react';
import MessageDialog from "../utilities/MessageDialog";
import {Link,BrowserRouter as Router} from "react-router-dom";
import AuthService from '../../services/auth/Auth.Service';


function Login(props) {



    const [state, setState] = useState({
        username:"",
        password:""
    });

    const [message, setMessage] = useState("");
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

    function validateForm(){
        if(state.username.length > 0 && state.password.length > 0){
            return true;
        }
        else{
            setMessage("Please fill all fields");
            setIsMessageDialogOpen(true);
            return false;
        }

    }

    function onChangeHandler(event){
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        if(validateForm()){
            AuthService.login(state.username, state.password).then(
                (response)=>{
                    //the response is true if user has been logged in
                    //route to other page
                    window.location = "/dashboard/home"

                },
                (error) =>{
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage)
                    setIsMessageDialogOpen(true)
                }
            )
        }
        //api call here
    }

    return (
        <form style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <label style={{fontSize:'36px',color:'#fff'}}>Log into your account</label>

            <div className={"field-input-container"}>
                <label style={{color:'white'}}><span style={{color:'red'}}>*</span> Username:</label>
                <input
                    autoFocus={true}
                    className={"field-input"}
                    type={'text'}
                    name={'username'}
                    placeholder={"Username"}
                    value={state.username}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={"field-input-container"}>
                <label style={{color:'white'}}>
                    <span style={{color:'red'}}>*</span> Password:
                </label>
                <input
                    className={"field-input"}
                    type={'password'}
                    name={"password"}
                    placeholder={"Password"}
                    value={state.password}
                    onChange={onChangeHandler}
                />
            </div>

            <Link to={"/dashboard/home"}>
                <button
                    className={"field-submit-button"}
                    type={"submit"}
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </Link>

            {/*//navigate to registration field*/}
            <div  style={{display:'flex', flexDirection:'row'}}>
                <h4 style={{color:'#808080'}}>Don't have account?</h4>
                <h4
                    style={{
                        color:'#4267B2',
                        marginLeft:'128px',
                        cursor:"pointer"
                    }}
                    onClick={props.signUpHandler}
                >Sign up</h4>
            </div>
            <MessageDialog isMessageDialogOpen={isMessageDialogOpen} setIsMessageDialogOpen={setIsMessageDialogOpen} topic={"ALERT"} message={message}/>

        </form>
    );
}

export default Login
