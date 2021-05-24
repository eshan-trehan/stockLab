import React from 'react' 
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Home() {
    const history = useHistory()
    const { currentUser } = useAuth()

    return (
        <Container className="home d-flex align-items-center justify-content-center">
            <h1>OneStop Destination for Everything Investment Related!</h1>
            <Button className="w-100" onClick={() => {history.push(currentUser ?  '/dashboard': '/signup')}}>
                {currentUser ? "Move to Dashboard" : "Start Your Journey"}
            </Button>
        </Container>
    )
}
