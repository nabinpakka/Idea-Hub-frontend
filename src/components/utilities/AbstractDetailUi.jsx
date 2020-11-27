import React from "react";


function AbstractDetailUi({isAbstract,value}){

    return(
        <div className={"abstract-container"} style={{
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            marginTop:'24px'
        }}>
            <label style={{fontWeight:'bold'}}>{isAbstract ? "Abstract" :"Detail"}</label>
            <textarea readOnly={true}
                      style=
                          {{
                              width:"90vh",
                              height:"24vh",
                              marginTop:'16px',
                              borderWidth:0
                          }}>
                        {value}
                    </textarea>
        </div>
    )
}
export default AbstractDetailUi;
