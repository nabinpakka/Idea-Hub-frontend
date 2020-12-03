import React, {useState} from 'react';
import PublicationService from '../../../services/dashboard/Publication.Service'
import MessageDialog from "../../utilities/MessageDialog";


function ComposePublication(props) {

    const [state, setState] = useState({
        title:"",
        publicationType:"",
        publicationHouse:"",
        abst:"",
        detail:"",
    });

    const [files, setFiles] = useState([]);
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageTopic, setMessageTopic] = useState("");

    function onChangeHandler(event){
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    function filesHandler(event){
        let inputFiles = event.target.files;
        let inputFilesArr = Array.prototype.slice.call(inputFiles);
        setFiles([...files, ...inputFilesArr]);

    }

    function validateForm(){
        if(state.title.length>0 && state.abst.length >0
            && state.detail.length >0 && state.publicationHouse.length >0 && state.publicationType.length >0){
            return true;
        }
        else{
            console.log("Please fill all the fields")
            return false;
        }
    }

    function handleSubmit() {
        if(validateForm()){
            let data = new FormData();
            // data.append("file",new Blob(files,{
            //     type:'multipart/form-data'
            // }))

            //multiple file access is not implemented yet
            data.append("file",files[0])
            data.append("title",state.title)
            data.append("abst",state.abst)
            data.append("detail",state.detail)
            data.append("publicationHouse",state.publicationHouse)
            data.append("publicationType",state.publicationType)

            PublicationService.uploadPublications(
                data
            ).then( (response) =>{

                    setMessageTopic("SUCCESSFUL")
                    setMessage("Publication composed !")

                // setIsMessageDialogOpen(true)
            }).catch((error)=>{
                console.log(error)
                setMessageTopic("ALERT")
                setMessage("Publication with same title already exists.")

            });
        }
        else{
            setMessageTopic("ALERT")
            setMessage("Please fill all the fields")
            // setIsMessageDialogOpen(true)
        }
        setIsMessageDialogOpen(true)
    }

    return (
        <div style={{
            backgroundColor:'#fff',
            width:'100%',
            marginTop:'64px',
            height:'120vh',
            overflow:'hidden',
            display:"flex",
            flexDirection:"column",
            alignItems:'center'
        }}>

            <div className={"field-input-container"} >
                <input
                    autoFocus={true}
                    className={"field-input"}
                    style={{width:'480px'}}
                    type={'text'}
                    name={'title'}
                    placeholder={"Title"}
                    value={state.title}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={"field-input-container"} >
                <input
                    className={"field-input"}
                    style={{width:'480px'}}
                    type={'text'}
                    name={'publicationType'}
                    placeholder={" Publication Type"}
                    value={state.publicationType}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={"field-input-container"} >
                <input
                    className={"field-input"}
                    style={{width:'480px'}}
                    type={'text'}
                    name={'publicationHouse'}
                    placeholder={"Publication House"}
                    value={state.publicationHouse}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={"field-input-container"} >
                <textarea
                    className={"field-input"}
                    style={{width:'480px',height:'128px',lineHeight:'1.2rem'}}
                    type={'text'}
                    name={'abst'}
                    placeholder={"Abstract"}
                    value={state.abst}
                    onChange={onChangeHandler}
                />
            </div>
            <div className={"field-input-container"} >
                <textarea
                    className={"field-input"}
                    style={{width:'480px',height:'128px',lineHeight:'1.2rem'}}
                    type={'text'}
                    name={'detail'}
                    placeholder={"Detail"}
                    value={state.detail}
                    onChange={onChangeHandler}
                />
            </div>
            <div style={{fontFamily: 'sans-serif',
                display: 'flex',
                width:'480px',
                marginTop:'24px'
            }}>
                <label className="custom-file-upload" style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <input style={{width:'400px'}} type="file" multiple onChange={filesHandler} />
                    {files.length ===0? <p style={{fontSize:'10px',verticalAlign:'top'}}>max:200MB</p>:""}
                </label>
                {files.length >1 && <div style={{display:'flex',flexDirection:'column'}}>
                    {files.map((file,index) =>
                        <div key={index} className="file-preview" >{file.name}</div>
                    )}
                </div> }
            </div>
            <button
                className={"field-submit-button"}
                style={{width:'480px'}}
                type={"submit"}
                onClick={handleSubmit}
            >
                Compose
            </button>
            <MessageDialog
                setIsMessageDialogOpen={setIsMessageDialogOpen}
                isMessageDialogOpen={isMessageDialogOpen}
                topic={messageTopic}
                message={message}
            />
        </div>
    );
}

export default ComposePublication;
