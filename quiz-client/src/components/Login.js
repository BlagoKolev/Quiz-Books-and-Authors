import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import Center from './Center';

function Login() {

    return (
        <Center>
            <Card sx={{ width: 500 }}>
                <CardContent sx={{textAlign:'center'}}>
                    <Typography variant='h4' sx={{my:3}}>Welcome to Books Quiz</Typography>
                    <Box sx={{ '.MuiFormControl-root': { m: 1, width: '90%' } }}>
                        <form>
                            <TextField name="email" id="outlined-basic" label="Email" variant="outlined" />
                            <TextField name="password" id="outlined-basic" label="Password" variant="outlined" />
                            <Button sx={{ width: '90%' }} type="submit" variant="contained" size="large">Start Qiuz</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}

export default Login; 