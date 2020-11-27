import React, {useState} from 'react';
import Modal from "react-modal";
import AlertDialog from "../utilities/AlertDialog";

function SignUp({isSignUpDialogOpen,setIsSignUpDialogOpen}) {

    const [state, setState] = useState({
        username:"",
        role:"AUTHOR",
        password:"",
        confirmPassword:""
    });


    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    function onChangeHandler(event){
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }


    function validator(){
        if(state.password.length >0 && state.username.length > 0 && state.confirmPassword.length > 0){
            if(state.password !== state.confirmPassword){
                setAlertMessage("Password does not match!")
                setIsAlertDialogOpen(true);
                return true;
            }
            else{
                return false;
            }
        }else{
            setAlertMessage("Please fill in all the fields");
            setIsAlertDialogOpen(true)
            return false;
        }
    }

    function signUpHandler(){
        if(validator()){
            //network call for signup
        }

    }

    return (
        <Modal
            isOpen={isSignUpDialogOpen}
            style={{
                // overlay: {
                // },
                content: {
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    transform             : 'translate(-50%, -50%)',
                    borderRadius          : '20px'
                }
            }}
            onRequestClose={()=>{
                setIsSignUpDialogOpen(false)
            }}
        >
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems: 'center',
                height:'65vh',
                borderRadius:'20px',
                backgroundColor:'#fff'

            }}>
                <label style={{fontSize:'36px',color:'#808080'}}>Log into your account</label>
                <input
                    autoFocus={true}
                    className={"field-input"}
                    type={'text'}
                    style={{marginTop:'24px'}}
                    name={'username'}
                    placeholder={"Username"}
                    onChange={onChangeHandler}
                />
                <select name={"role"} style={{
                    height: '40px',
                    width: '320px',
                    marginTop:'24px',
                    borderRadius:'5px'
                }} onChange={onChangeHandler}>
                    <option  selected={true} value={"AUTHOR"}>AUTHOR</option>
                    <option value={"PUBLICATION_HOUSE"}>PUBLICATION_HOUSE</option>
                </select>
                <input
                    className={"field-input"}
                    style={{marginTop:'24px'}}
                    type={'password'}
                    name={"password"}
                    placeholder={"Password"}
                    value={state.password}
                    onChange={onChangeHandler}
                />
                <input
                    className={"field-input"}
                    type={'password'}
                    style={{marginTop:'24px'}}
                    name={"confirmPassword"}
                    placeholder={"Confirm Password"}
                    value={state.confirmPassword}
                    onChange={onChangeHandler}
                />
                <button className={'field-submit-button'} onClick={signUpHandler}>Sign Up</button>
            </div>
            <AlertDialog isAlertDialogOpen={isAlertDialogOpen} setIsAlertDialogOpen={setIsAlertDialogOpen} alertMessage={alertMessage}/>
        </Modal>
    );
}

export default SignUp;
