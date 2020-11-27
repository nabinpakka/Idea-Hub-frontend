import React from 'react';
import AbstractDetailUi from "../../utilities/AbstractDetailUi";
import Modal from "react-modal";

function PublicationDialog({isPublicationDialogOpen,setIsPublicationDialogOpen,clickedPublication}) {

    return (
        <Modal
            isOpen={isPublicationDialogOpen}
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
            onRequestClose={()=>setIsPublicationDialogOpen(false)}
        >
            <div style={{
                display:'flex',
                overflow:'scroll',
                flexDirection:'column',
                alignItems: 'center',
                height:'80vh',
                width:'100vh',
                borderRadius:'20px',
                backgroundColor:'#fff'
            }}>
                <h3>{clickedPublication.title}</h3>
                <label style={{paddingLeft:'8px',
                    paddingRight:'8px',
                }}>
                    {clickedPublication.author} - {clickedPublication.publicationHouse}
                    {/*{clickedPublication.approved ? <CheckBoxRoundedIcon style={{color:'green',paddingLeft:'16px'}}/>:""}*/}
                </label>

                <AbstractDetailUi isAbstract={true} value={clickedPublication.abstract}/>
                <AbstractDetailUi isAbstract={false} value={clickedPublication.detail}/>

            </div>

        </Modal>
    );
}

export default PublicationDialog;
