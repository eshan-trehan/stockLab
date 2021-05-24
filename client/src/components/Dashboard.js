import React from 'react'
import { useState } from 'react'
//import { Card, Container, Button } from 'react-bootstrap'
//import { useAuth } from '../context/authContext'
import NewsTab from './NewsTab/NewsTab'
import StockTab from './StockTab/StockTab'

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState(3)

    return (
        <div className="dashboard">
            <div className="tabtoggle">
                <h1 className="tag" onClick={() => setCurrentTab(1)} style={currentTab === 1 ? {color:"#eb5468"} : {}}>News</h1> <h1>/</h1>
                <h1 className="tag" onClick={() => setCurrentTab(2)} style={currentTab === 2 ? {color:"#eb5468"} : {}}>Stocks</h1> <h1>/</h1>
                <h1 className="tag" onClick={() => setCurrentTab(3)} style={currentTab === 3 ? {color:"#eb5468"} : {}}>Commodity</h1> <h1>/</h1>
                <h1 className="tag" onClick={() => setCurrentTab(4)} style={currentTab === 4 ? {color:"#eb5468"} : {}}>Notes</h1>
            </div>
            <div>
                {currentTab === 1 && <NewsTab className="news"/>}
                {currentTab === 2 && <StockTab className="stock"/>}
            </div>
        </div>
    )
}
