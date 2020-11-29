import React from 'react';
import Modal from "react-modal";

function AlertDialog({isAlertDialogOpen,setIsAlertDialogOpen,topic,alertMessage}) {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isAlertDialogOpen}
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
                    borderRadius          : '20px',
                    autofocus             : true
                }
            }}
            onRequestClose={()=>setIsAlertDialogOpen(false)}
        >
            <div style={{display:'flex',
                flexDirection:'column',
                alignItems: 'center',
                borderRadius:'20px',
                backgroundColor:'#fff'}}>
                <h1 style={{color:topic==="ALERT" ? 'red':'green'}}>{topic}</h1>
                <p>{alertMessage}</p>

            </div>

        </Modal>
    );
}

export default AlertDialog;
