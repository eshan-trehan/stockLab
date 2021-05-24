import React from 'react'
import StockForm from './StocksForm'
import StockCards from './StockCards'

export default function StockTab() {
    return (
        <div className="stockTab">
            <StockForm/>
            <StockCards/>
        </div>
    )
}
