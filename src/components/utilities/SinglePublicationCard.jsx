import React from 'react';
import {Card } from 'react-bootstrap';
function SinglePublicationCard({data}) {

    return (
            <Card
                style={{
                    width:'16rem',
                    height:'16rem',
                    background:'#c4c4c4',
                    borderRadius:'10px',
                    cursor:'pointer',
                    margin:'16px'
                }}

            >
                <Card.Title style={{
                    background:"#808080",
                    fontSize:'18px',
                    height:'6rem',
                    borderRadius:'10px',
                    textAlign:'center'
                }}
                >
                    {data.title}
                </Card.Title>
                <label style={{paddingLeft:'8px',paddingRight:'8px'}}>
                    - {data.publicationHouse}
                </label>
                <p style={{
                    display:"block",
                    textOverflow:'ellipsis',
                    wordWrap:'break-word',
                    overflow:'hidden',
                    maxHeight:'6.0rem',
                    lineHeight:'1.2rem',
                    paddingLeft:'8px',
                    paddingRight:'8px',
                    textAlign:'justify'
                }}>{data.abst}</p>
            </Card>
    );
}

export default SinglePublicationCard;
