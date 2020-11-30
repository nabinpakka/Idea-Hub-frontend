import React, {useEffect, useState} from 'react';
import SinglePublicationCard from "../../utilities/SinglePublicationCard";

import PublicationDialog from "./PublicationDialog";
import PublicationService from "../../../services/dashboard/Publication.Service";
import MessageDialog from "../../utilities/MessageDialog";

function MyPublications(props) {

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
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

    useEffect(()=>{
        if(props.role !==null){
            PublicationService.getMyPublications(props.role).then((response)=>{
                console.log(response)
                setDatas(response)
            })
        }
    },[props.role])

    useEffect(()=>{
        if(datas ===null || datas.length ===0){
            console.log(datas)
            setIsMessageDialogOpen(true)
        }
    },[datas])

    function publicationClickHandler(uuid){
        setIsPublicationDialogOpen(true)

        //getting the fake object
        //the filter object returns a list
        //the list should contain only one object with given uuid
        let data = datas.filter((data)=>data.uuid === uuid)[0]
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
                ) : <MessageDialog topic={"ALERT"} message={"You do not have any publication."} isMessageDialogOpen={isMessageDialogOpen} setIsMessageDialogOpen={setIsMessageDialogOpen}/>
            }

            <PublicationDialog isPublicationDialogOpen={isPublicationDialogOpen}
                               setIsPublicationDialogOpen={setIsPublicationDialogOpen}
                               clickedPublication={clickedPublication} isReview={false}/>
        </div>
    );
}

export default MyPublications;
