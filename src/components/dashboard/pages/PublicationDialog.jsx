import React, {useEffect, useState} from 'react';
import AbstractDetailUi from "../../utilities/AbstractDetailUi";
import Modal from "react-modal";
import getFiles from '../../../services/dashboard/File.Service';
import PublicationService from '../../../services/dashboard/Publication.Service';


//pass if it is the review tab
function PublicationDialog({isPublicationDialogOpen,setIsPublicationDialogOpen,clickedPublication,setReload,isReview,role}) {

    const [responseFile, setResponseFile] = useState({});
    //getting file download link
    useEffect(()=>{
        if(isPublicationDialogOpen){
            getFiles(clickedPublication.fileId).then((response)=>{
                console.log(response)
                setResponseFile(response)
            })
        }
    },[isPublicationDialogOpen])

    const buttonHandler=(event)=>{
        let button = event.target.name;
        if(button === "approve"){
            PublicationService.updateReview(clickedPublication.uuid,true).then((response)=>{
                //closing the dialog
                setIsPublicationDialogOpen(false);
                setReload(true)
            })
        }else{
            PublicationService.updateReview(clickedPublication.uuid,false).then((response)=>{
                //closing the dialog
                setIsPublicationDialogOpen(false);
                setReload(true)
            })
        }

    }
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

                <label style={{float:'left',marginTop:'24px'}}>
                    File: <a href={responseFile.url}>{responseFile.name}</a>
                </label>

                {/*//approve and disapprove button only for authors and toReview tab*/}
                {
                    isReview && role==="AUTHOR" ?<div className={"approve-disprove-publication"}
                                   style={{
                                       width:"100%",
                                       height:"32px",
                                       marginTop:"24px",
                                       display:'flex',
                                       flexDirection:'row'
                                   }}>
                        <button name={"approve"} style={{backgroundColor:'green', width:"60%",cursor:'pointer'}} onClick={buttonHandler}>
                            Approve
                        </button>
                        <button name={"reject"} style={{backgroundColor:'red',width:"60%",marginLeft:"16px",cursor:'pointer'}} onClick={buttonHandler}>
                            Reject
                        </button>
                    </div>:""
                }
            </div>

        </Modal>
    );
}

export default PublicationDialog;
