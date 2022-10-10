import { Button, Grid, Paper } from '@mui/material';
import { spacing } from '@mui/system';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';
import ScoreTable from './ScoreTable';

function Home() {

    const { user } = useContext(UserContext);

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2.5} sx={{mt:5, ml:5}}>
                    <ScoreTable />
                </Grid>
                <Grid item xs={9}  sx={{ pr:20}}>
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
                </Grid>

            </Grid>

        </div>
    )
}

export default Home;