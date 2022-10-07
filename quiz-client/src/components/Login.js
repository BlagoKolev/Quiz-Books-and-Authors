import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import Center from './Center';
import { BaseUrl, Accounts, loginEndPoint, api } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {

    const { setUser, setScore } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function onLogin(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let validateErrors = Validate(formData);
        if (!validateErrors) {
            loginUser(formData);
            navigate("/")
        }
    }

    function loginUser(formData) {

        let data = {};
        data.email = formData.get('email');
        data.password = formData.get('password');

        fetch(BaseUrl + api + Accounts + loginEndPoint,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                const token = res.token;
                localStorage.setItem('token', token);
                //setUser(res.username);
                setUser(res);
                setScore(res.score);
            })
            .catch(console.error)
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
                            <TextField type="password" name="password" id="outlined-basic" label="Password" variant="outlined" />
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