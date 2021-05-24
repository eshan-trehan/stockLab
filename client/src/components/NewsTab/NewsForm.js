import React, { useState, useRef } from 'react'
import { useAuth } from '../../context/authContext'
import { database } from '../../firebase'
import { Form, Button } from 'react-bootstrap'
import NewsKeyWords from './NewsKeyWords'

export default function NewsForm() {
    const { currentUser } = useAuth()
    const keyWordRef = useRef()
    const [loading, setLoading] = useState(false)
    const url = 'users/' + currentUser.uid + '/keyWords'

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const keyWordDatabaseRef = database.ref(url)

        try{
            setLoading(true)
            const keyWordCurr = {
                keyWord: keyWordRef.current.value
            }
            await keyWordDatabaseRef.push(keyWordCurr)
            setLoading(false)
        }
        catch {
            setLoading(false)
        }
    }

    return (
        <>
        <div className="newsForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Keyword</Form.Label>
                    <Form.Control type="text" ref={keyWordRef} required/>
                </Form.Group>
                <Button className="w-100" type="submit" disabled={loading}>Add</Button>
            </Form>
            <NewsKeyWords/>
        </div>
        </>
    )
}
