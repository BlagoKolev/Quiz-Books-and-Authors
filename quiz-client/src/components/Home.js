import { Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

function Home() {

    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Welcome to Books Quiz Challenge</h1>
            {!user && (
                <>
                    <h3>Please
                        <Link to={'login'} style={{ textDecoration: 'none' }}>
                            <Button>Login</Button>
                        </Link>
                        to proceed to quiz</h3>

                    <h3>or
                        <Link to={'register'} style={{ textDecoration: 'none' }}>
                            <Button> Create an account </Button>
                        </Link>
                        if you do not have one.</h3>

                </>
            )}
            {user && <Link to={'question'} style={{ textDecoration: 'none' }}><Button><h2>Start Quiz</h2></Button></Link>}
        </div>
    )
}

export default Home;