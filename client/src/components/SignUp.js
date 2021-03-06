import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import { Link, useHistory } from 'react-router-dom'


export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
            try {
                const createUserUrl = "http://localhost:5000/user/createUser?userId=" +  currentUser.uid
                await fetch(createUserUrl, {method: 'POST'})
                history.push('/dashboard')
            }
            catch {
                setLoading(false)
                setError('Failed to Create Account')
            }
        } catch {
            setLoading(false)
            setError('Failed to Create Account')
        }
    }

    return (
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "80vh"}}>
            <div className="signup">
                <Card className="form">
                    <Card.Body>
                        <h2 className="text-center mb-4 "> Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required/>
                            </Form.Group>
                            <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2 extra">
                    Already have an account? <Link to="/login"> Log In!</Link>
                </div>
            </div>
        </Container>
    )
}
