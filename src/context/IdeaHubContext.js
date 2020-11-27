import React,{useState,useContext} from 'react';

export const IdeaHubContext =useContext() ;
function IdeaHubContext(props) {

    const [jwt, setJwt] = useState("");

    const addJwt= (jwt)=>{
        setJwt(jwt)
    }

    return (
        <IdeaHubContext.Provider value={}>
            {props.children}
        </IdeaHubContext.Provider>

    );
}


