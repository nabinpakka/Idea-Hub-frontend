import React, {useState} from 'react';
import PublicationService from '../../../services/dashboard/Publication.Service'


function ComposePublication(props) {

    const [state, setState] = useState({
        title:"",
        publicationHouse:"",
        abst:"",
        detail:""
    });

    const [files, setFiles] = useState([]);

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
            && state.detail.length >0 && state.publicationHouse.length >0){
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
            data.append("file",files[0])

            data.append("title",state.title)
            data.append("abst",state.abst)
            data.append("detail",state.detail)
            data.append("publicationHouse",state.publicationHouse)

            // data.append('title',
            //     new Blob([JSON.stringify(state.title)], {
            //         type: 'multipart/form-data'
            //     }));
            // data.append('abst',
            //     new Blob([JSON.stringify(state.abst)], {
            //         type: 'multipart/form-data'
            //     }));
            // data.append('detail',
            //     new Blob([JSON.stringify(state.detail)], {
            //         type: 'multipart/form-data'
            //     }));
            // data.append('publicationHouse',
            //     new Blob([JSON.stringify(state.publicationHouse)], {
            //         type: 'multipart/form-data '
            //     }));

            PublicationService.uploadPublications(
                data
            ).then( (response) =>{

            });
        }
    }

    return (
        <div style={{
            backgroundColor:'#fff',
            width:'100%',
            marginTop:'64px',
            height:'100vh',
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
                    autoFocus={true}
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
                    autoFocus={true}
                    className={"field-input"}
                    style={{width:'480px',height:'128px'}}
                    type={'text'}
                    name={'abst'}
                    placeholder={"Abstract"}
                    value={state.abst}
                    onChange={onChangeHandler}
                />
            </div>
            <div className={"field-input-container"} >
                <textarea
                    autoFocus={true}
                    className={"field-input"}
                    style={{width:'480px',height:'128px'}}
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
                <label className="custom-file-upload">
                    <input style={{width:'200px'}} type="file" multiple onChange={filesHandler} />
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

        </div>
    );
}

export default ComposePublication;
