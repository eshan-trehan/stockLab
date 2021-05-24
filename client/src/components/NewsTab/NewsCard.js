import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function NewsCard({ data }) {
    function truncateString(str){
        if (str.size < 90) return str
        else return (str.substr(0, 90) + "...")
    }

    if (data.urlToImage === null) data.urlToImage = '../no_image.png' 
    return (
        <Card className="newsCard">
            <Card.Img variant="top" src={data.urlToImage} style ={{height:"200px"}}/>
            <Card.Body>
                <div className="newsCardHeading">{truncateString(data.title)}</div>
            </Card.Body>
            <a href={data.url}><Button> Link </Button></a>
        </Card>
    )
}
