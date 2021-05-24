import React, { useState, useRef } from 'react'
import { useAuth } from '../../context/authContext'
import { Form, Button } from 'react-bootstrap'

export default function StockForm() {
    const { currentUser } = useAuth()
    const stockRef = useRef()
    const stockExchangeRef = useRef()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)

        try{
            setLoading(true)
            const addStockUrl = `http://localhost:5000/user/stocks?userId=${currentUser.uid}&exchange=${stockExchangeRef.current.value}&symbol=${stockRef.current.value}&del=false`
            console.log(addStockUrl)
            setLoading(false)
        }
        catch {
            setLoading(false)
        }
    }

    return (
        <>
        <div className="stockFormCont">
            <Form onSubmit={handleSubmit} className="stockForm">
                <Form.Group>
                    <Form.Label>Stock Exchange</Form.Label>
                    <Form.Control as="select" size="lg" ref={stockExchangeRef}>
                        <option>NASDAQ</option>
                        <option>BSE</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock Symbol</Form.Label>
                    <Form.Control type="text" ref={stockRef} required/>
                </Form.Group>

                <Button className="w-100" type="submit" disabled={loading}>Add</Button>
            </Form>
        </div>
        </>
    )
}
