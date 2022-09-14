import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Welcome to Books Quiz Challenge</h1>
            <h3>Please login to proceed to quiz</h3>
            <Link to={'login'}><Button>Login</Button></Link>
            <h3>or Create an account if you do not have one.</h3>
            <Link to={'register'}><Button>Register</Button></Link>
        </div>
    )
}

export default Home;