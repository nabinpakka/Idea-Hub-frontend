import React, {useEffect, useState} from 'react';
import AbstractDetailUi from "../../utilities/AbstractDetailUi";
import Modal from "react-modal";
import getFiles from '../../../services/dashboard/File.Service';
import PublicationService from '../../../services/dashboard/Publication.Service';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AuthService from "../../../services/auth/Auth.Service";
import {Multiselect} from "multiselect-react-dropdown";
import MessageDialog from "../../utilities/MessageDialog";
//pass if it is the review tab
function PublicationDialog({isPublicationDialogOpen,setIsPublicationDialogOpen,clickedPublication,setReload,isReview,role}) {

    const [responseFile, setResponseFile] = useState({});
    const [authors, setAuthors] = useState([{}]);
    const [reviewers, setReviewers] = useState([]);

    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageTopic, setMessageTopic] = useState("");
    //getting file download link
    useEffect(()=>{
        if(isPublicationDialogOpen){
            getFiles(clickedPublication.fileId).then((response)=>{
                console.log(response)
                setResponseFile(response)
            })
        }
    },[isPublicationDialogOpen])

    useEffect(()=>{
        //getting all the authors
        //condition is role == publication_house
       if(role === "PUBLICATION_HOUSE"){
           AuthService.getAuthors().then((response)=>{
               console.log(response)
               setAuthors(response)
           })
       }
    },[isPublicationDialogOpen])


    function assignReviewersHandler(){
        if(reviewers.length ===5){
            //sending only author names
            let selectedReviewersNames = []
            reviewers.forEach((reviewer)=>{
                selectedReviewersNames.push(reviewer.uuid)
            })
            console.log(selectedReviewersNames)
            PublicationService.assignReviewers(clickedPublication.uuid,selectedReviewersNames)
                .then((response)=>{
                    //show alert
                    setMessageTopic("SUCCESSFUL")
                    setMessage("Reviewers assigned!!")

                }).catch((response)=>{
                setMessageTopic("ALERT")
                setMessage("Reviewers assign failed!")
            })
            setIsMessageDialogOpen(true)

        }else{
            console.log("less/more authors")
            setMessageTopic("ALERT")
            setMessage("Exactly 5 reviewers are needed")
            setIsMessageDialogOpen(true)
        }
    }

    function onSelectReviewer(selectedList,selectedItem){
        //only 5 authors can be selected
        setReviewers(selectedList);
    }

    function onRemoveReviewer(selectedList,removedItem){
        console.log(selectedList)
        console.log(removedItem)
    }

    const buttonHandler=(event)=>{
        let button = event.target.name;
        if(button === "approve"){
            PublicationService.updateReview(clickedPublication.uuid,true).then((response)=>{
                //closing the dialog
                window.setTimeout(()=>{
                    setMessageTopic("SUCCESSFUL")
                    setMessage("Publication Approved")
                    setIsMessageDialogOpen(true)
                },2000)
                setIsMessageDialogOpen(false)
                setIsPublicationDialogOpen(false);
                setReload(true)
            })
        }else if (button==="reject"){
            PublicationService.updateReview(clickedPublication.uuid,false).then((response)=>{
                //closing the dialog
                window.setInterval(()=>{
                    window.setTimeout(()=>{
                        setMessageTopic("SUCCESSFUL")
                        setMessage("Publication rejected")
                        setIsMessageDialogOpen(true)
                    },2000)
                    setIsMessageDialogOpen(false)
                    setIsPublicationDialogOpen(false);
                    setReload(true)
                })
            })
        }
    }
    return (
        <Modal
            isOpen={isPublicationDialogOpen}
            style={{
                overlay: {
                },
                content: {
                    top                   : '10%',
                    left                  : '25%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    // transform             : 'translate(-50%, -50%)',
                    borderRadius          : '20px',
                    // autofocus             : true
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
                    display:'flex',
                    alignItems:"center"
                }}>
                    {clickedPublication.publicationType} - {clickedPublication.publicationHouse}
                    {clickedPublication.approved ? <CheckBoxIcon style={{color:'green',marginLeft:'8px'}}/>
                    : <p style={{color:'#808080',marginLeft:'8px'}}>Pending...</p>}

                    {/*{clickedPublication.approved ? <CheckBoxRoundedIcon style={{color:'green',paddingLeft:'16px'}}/>:""}*/}
                </label>

                <AbstractDetailUi isAbstract={true} value={clickedPublication.abstract}/>
                <AbstractDetailUi isAbstract={false} value={clickedPublication.detail}/>

                <label style={{float:'left',marginTop:'24px'}}>
                    File: <a href={responseFile.url} >{responseFile.name}</a>
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


                {
                    isReview && role==="PUBLICATION_HOUSE" ?
                        <div className={"assign-reviewers"} style={{width:"100%"}}>
                            <Multiselect
                                style={{marginTop:'16px'}}
                                options={authors}
                                selectedValues = {reviewers}
                                onSelect={onSelectReviewer}
                                onRemove={onRemoveReviewer}
                                displayValue={"username"}
                                placeholder={"Select reviewers"}
                            />
                            <button style={{
                                background:"#4267B2",
                                color:'white',
                                fontSize:'14px',
                                width:"100%",
                                marginTop:'16px',
                                paddingTop:'10px',
                                paddingBottom:'10px'
                            }} onClick={assignReviewersHandler}
                            >Assign Reviewers</button>
                        </div>

                        : ""
                }
                <MessageDialog
                    setIsMessageDialogOpen={setIsMessageDialogOpen}
                    isMessageDialogOpen={isMessageDialogOpen}
                    message={message}
                    topic={messageTopic}
                />
            </div>

        </Modal>
    );
}

export default PublicationDialog;
