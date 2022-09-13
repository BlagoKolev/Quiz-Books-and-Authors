import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Center from './Center';

function Login() {

    let [errors, setErrors] = useState({});

    function onLogin(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let errors = Validate(formData);
    }

    function Validate(formData) {

        const errors = {};
        let mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        let email = formData.get('email');
        let password = formData.get('password');

        if (!email) {
            errors.email = 'Email field is required.'
            setErrors(errors);
            console.log(errors)
        } else if (!mailFormat.test(email)) {
            errors.email = 'Invalid email format.'
            setErrors(errors);
        }
        else if (!password) {
            errors.password = 'Password field is reqired';
            setErrors(errors);
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 symbols'
            setErrors(errors);
        }

        return errors;
    }

    return (
        <Center>
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ my: 3 }}>Welcome to Books Quiz</Typography>
                    <Box sx={{ '.MuiFormControl-root': { m: 1, width: '90%' } }}>
                        <form onSubmit={onLogin}>
                            <TextField name="email" id="outlined-basic" label="Email" variant="outlined" />
                            {errors.email ? <span style={{ color: 'red' }}>{errors.email}</span> : <span></span>}
                            <TextField name="password" id="outlined-basic" label="Password" variant="outlined" />
                            {errors.password ? <span style={{ color: 'red' }}>{errors.password}</span> : <span></span>}
                            <Button sx={{ width: '90%' }} type="submit" variant="contained" size="large">Start Qiuz</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}

export default Login; 