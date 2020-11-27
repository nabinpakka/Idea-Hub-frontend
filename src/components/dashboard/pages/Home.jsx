import React, {useState} from 'react';
import {FakeData as fakes} from "../../utilities/FakeData";
import SinglePublicationCard from "../../utilities/SinglePublicationCard";
import PublicationDialog from "./PublicationDialog";

function Home() {

    const [isPublicationDialogOpen, setIsPublicationDialogOpen] = useState(false);
    const [clickedPublication, setClickedPublication] = useState({
        uuid:"",
        title:"",
        author:"",
        publicationHouse:"",
        abstract:"",
        detail:"",
        approved:false
        }
    );

    function publicationClickHandler(uuid){
        setIsPublicationDialogOpen(true)

        //getting the fake object
        //the filter object returns a list
        //the list should contain only one object with given uuid
        let fake = fakes.filter((fake)=>fake.uuid === uuid)[0]
        console.log(fake)
        setClickedPublication({
            title: fake.title,
            publicationHouse: fake.publicationHouse,
            uuid:uuid,
            author:fake.author,
            abstract: fake.abstract,
            detail:fake.detail,
            approved: fake.approved

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
                fakes.map((fake)=>
                    <div key={fake.uuid} onClick={()=>publicationClickHandler(fake.uuid)}>
                        <SinglePublicationCard fake={fake} />
                    </div>
                )
            }

            <PublicationDialog isPublicationDialogOpen={isPublicationDialogOpen}
                               setIsPublicationDialogOpen={setIsPublicationDialogOpen}
                                clickedPublication={clickedPublication}
            />
        </div>

    );
}

export default Home;
