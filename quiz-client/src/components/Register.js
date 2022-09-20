import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Center from './Center';
import { BaseUrl, Accounts, registerEndPoint, api } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom';

function Register() {

    let [errors, setErrors] = useState({});
    let navigate = useNavigate();

    function onRegister(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let errorsList = Validate(formData);

        if (Object.keys(errorsList).length == 0) {
            registerUser(formData);
            navigate("/");
        }
    }

    function registerUser(formData) {
        let data = {};
        data.email = formData.get('email');
        data.password = formData.get('password');

        fetch(BaseUrl + api + Accounts + registerEndPoint,
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
            })
            .catch(function (res) { console.log(res) })
    }

    function Validate(formData) {

        const errors = {};
        let mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        let email = formData.get('email');
        let password = formData.get('password');
        let confirmPassword = formData.get('confirmPassword')

        if (!email) {
            errors.email = 'Email field is required.'
            setErrors(errors);
        } else if (!mailFormat.test(email)) {
            errors.email = 'Invalid email format.'
            setErrors(errors);
        }
        else if (!password) {
            errors.password = 'Password field is reqired.';
            setErrors(errors);
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 symbols.'
            setErrors(errors);
        } else if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is reqired.'
            setErrors(errors);
        } else if (password != confirmPassword) {
            errors.confirmPassword = 'Password and Confirm password must be the same.'
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
                        <form onSubmit={onRegister}>
                            <TextField name="email" id="outlined-basic" label="Email" variant="outlined" />
                            {errors.email ? <span style={{ color: 'red' }}>{errors.email}</span> : <span></span>}
                            <TextField name="password" id="outlined-basic" label="Password" variant="outlined" />
                            {errors.password ? <span style={{ color: 'red' }}>{errors.password}</span> : <span></span>}
                            <TextField name="confirmPassword" id="outlined-basic" label="Confirm Password" variant="outlined" />
                            {errors.confirmPassword ? <span style={{ color: 'red' }}>{errors.confirmPassword}</span> : <span></span>}
                            <Button sx={{ width: '90%' }} type="submit" variant="contained" size="large">Register</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}

export default Register; 