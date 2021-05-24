import React from 'react'
/*import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { database } from '../../firebase'*/

export default function StockCards() {
    /*const { currentUser } = useAuth()
    const [stockList, setStockList] = useState()
    const url = 'users/' + currentUser.uid + '/stocks'

    useEffect(() => {
        const stockDatabaseRef = database.ref(url)
        stockDatabaseRef.on('value', (snapshot) => {
            const stocks = snapshot.val()
            const stockList = [];
            for (let id in stocks) {
                stockList.push({id, ...stocks[id]})
            }
            setStockList(stockList)
        })
        console.log(stockList)
    }, [url])*/

    return (
        <div className="stockList">
        </div>
    )
}
