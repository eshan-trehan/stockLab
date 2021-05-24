import React from 'react'
import NavBar from './NavBar'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
