import React from 'react';

import idea from "../../assets/idea.png"

function Logo({marginLeft,marginTop,height,width}) {
    return (
        <img src={idea} style={{width:width || '220px',
            height:height || '64px',
            marginLeft:marginLeft || '24px',
            marginTop:marginTop || '10px'}}/>
    );
}
export default Logo;
