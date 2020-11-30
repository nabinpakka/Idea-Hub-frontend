import React, {useEffect, useState} from 'react';
import SinglePublicationCard from "../../utilities/SinglePublicationCard";
import PublicationService from "../../../services/dashboard/Publication.Service";
import PublicationDialog from "./PublicationDialog";
import MessageDialog from "../../utilities/MessageDialog";

function ToReview(props) {

    const [isPublicationDialogOpen, setIsPublicationDialogOpen] = useState(false);
    const [clickedPublication, setClickedPublication] = useState({
            uuid:"",
            title:"",
            author:"",
            publicationHouse:"",
            abstract:"",
            detail:"",
            approved:false,
            fileId:"",
            publicationType:""
        }
    );

    const [datas, setDatas] = useState([{}]);
    const [reload, setReload] = useState(false);

    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

    useEffect(()=>{
        console.log("to review"+ props.role)
        if(props.role !== null){
            PublicationService.getPublicationsToReview(props.role).then((response)=>{
                setDatas(response)
                console.log(response)
            }).catch(e=>console.log(e))
        }

    },[reload])

    useEffect(()=>{
        if(datas ===null || datas.length===0){
            setIsMessageDialogOpen(true)
        }
    },[datas])

    function publicationClickHandler(uuid){
        setIsPublicationDialogOpen(true)

        let data = datas.filter((data)=>data.uuid === uuid)[0]
        console.log(data)
        setClickedPublication({
            title: data.title,
            publicationHouse: data.publicationHouse,
            uuid:uuid,
            author:data.authorId,
            abstract: data.abst,
            detail:data.detail,
            approved: data.approved,
            fileId: data.fileId,
            publicationType: data.publicationType
        })
        console.log(clickedPublication.title)
        // setClickedPublication(fake)
        console.log(uuid)
    }
    return (
        <div style={{
            display:'grid',
            marginTop:'64px',
            marginLeft:'32px',
            alignItems:'center',
            gridTemplateColumns: '1fr 1fr 1fr 1fr'

        }}>
            {
                datas.length>0 ? datas.map((data)=>
                    <div key={data.uuid} onClick={()=>publicationClickHandler(data.uuid)}>
                        <SinglePublicationCard data={data} />
                    </div>
                ) : <MessageDialog topic={"ALERT"} message={"No publication to review"} isMessageDialogOpen={isMessageDialogOpen} setIsMessageDialogOpen={setIsMessageDialogOpen}/>
            }
            <PublicationDialog isPublicationDialogOpen={isPublicationDialogOpen}
                               setIsPublicationDialogOpen={setIsPublicationDialogOpen}
                               clickedPublication={clickedPublication} setReload={setReload}
                                isReview={true}
                               role={props.role}
            />
        </div>
    );
}

export default ToReview;
