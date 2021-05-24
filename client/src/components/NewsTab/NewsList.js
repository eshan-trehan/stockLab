import React from 'react'
import NewsCard from './NewsCard'

export default function NewsList({ data }) {
    return (
        <div className="newsList">
            {data.map((element, index) => {
                if (element.urlToImage !== null) return (<NewsCard data={element} key={index}/>)
                else return (<></>)
            })}
        </div>
    )
}
