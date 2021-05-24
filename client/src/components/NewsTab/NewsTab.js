import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../context/authContext'
import { FiRefreshCw } from 'react-icons/fi'
import NewsContainer from './NewsContainer'
//import NewsCustom from './NewsCustom'

export default function NewsTab() {
    const { currentUser } = useAuth()
    const businessNewsIndia = "http://localhost:5000/news?country=India"
    const businessNewsWorld = "http://localhost:5000/news?country=World"
    const customNewsUrl = "http://localhost:5000/user/customNews?userId=" + currentUser.uid
    
    const [refreshIndianNews, setRefreshIndianNews] = useState(false)
    const [refreshWorldNews, setRefreshWorldNews] = useState(false)
    const [refreshCustomNews, setRefreshCustomNews] = useState(false)
    console.log(customNewsUrl)
    return (
        <>
        <div className="newsHeading">
            <h1>India</h1>
            <Button onClick={() => setRefreshIndianNews(true)} disable={refreshIndianNews}><FiRefreshCw style={{color:"black"}}className="refreshIcon"/></Button>
        </div>
        <div className="newsTab india">
            <NewsContainer name={"India"} url={businessNewsIndia} refresh={refreshIndianNews} setRefresh={setRefreshIndianNews}/>
        </div>
        <div className="newsHeading">
            <h1>World</h1>
            <Button onClick={() => setRefreshWorldNews(true)} disable={refreshWorldNews}><FiRefreshCw style={{color:"black"}} className="refreshIcon"/></Button>
        </div>
        <div className="newsTab india">
            <NewsContainer name={"World"} url={businessNewsWorld} refresh={refreshWorldNews} setRefresh={setRefreshWorldNews}/>
        </div>
        </>
    )
}
