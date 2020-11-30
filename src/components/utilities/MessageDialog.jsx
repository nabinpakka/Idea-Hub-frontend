import React from 'react';
import Modal from "react-modal";

function MessageDialog({isMessageDialogOpen,setIsMessageDialogOpen,topic,message}) {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isMessageDialogOpen}
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
            onRequestClose={()=>setIsMessageDialogOpen(false)}
        >
            <div style={{display:'flex',
                flexDirection:'column',
                alignItems: 'center',
                borderRadius:'20px',
                backgroundColor:'#fff'}}>
                <h1 style={{color:topic==="ALERT" ? 'red':'green'}}>{topic}</h1>
                <p>{message}</p>

            </div>

        </Modal>
    );
}

export default MessageDialog;
