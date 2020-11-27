import React ,{useState}from 'react';
import AlertDialog from "../utilities/AlertDialog";
import {Link} from "react-router-dom";
function Login({signUpHandler}) {

    const [state, setState] = useState({
        username:"",
        password:""
    });

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    function validateForm(){
        if(state.username.length > 0 && state.password.length > 0){
            return true;
        }
        else{
            setAlertMessage("Please fill all fields");
            setIsAlertDialogOpen(true);
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
                    onClick={signUpHandler}
                >Sign up</h4>
            </div>
            <AlertDialog isAlertDialogOpen={isAlertDialogOpen} setIsAlertDialogOpen={setIsAlertDialogOpen} alertMessage={alertMessage}/>

        </form>
    );
}

export default Login;
