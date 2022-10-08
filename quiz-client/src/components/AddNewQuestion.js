import { Box, TextField, Button, CardContent, Typography, Card, Snackbar, Alert } from "@mui/material";
import { BaseUrl, api, adminControllerEndPoint, addQuestionEndPoint } from '../Constants/Constants';
import Center from './Center';
import { useState } from "react";

function AddNewQuestion() {

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState();
    const [notificationMsg, setNotificationMsg] = useState();
    const [alertSuccess, setAlertSuccess] = useState();

    const Validate = (data) => {
        let bookTitle = data.get('bookTitle');
        let authorName = data.get('authorName');
        let pointsReward = data.get('pointsReward');

        const errorList = {};

        if (!bookTitle) {
            errorList.book = "Book name is required.";
            setErrors(errorList);
        }
        if (!authorName) {
            errorList.author = "Author name is required.";
            setErrors(errorList);
        }
        if (authorName.length < 3) {
            errorList.author = "Author name must be more than 3 symbols.";
            setErrors(errorList);
        }
        if (pointsReward < 1 || pointsReward > 20) {
            errorList.pointsReward = "Points reward must be between 1 and 20.";
            setErrors(errorList);
        }
        return errorList;
    };

    const CreateQuestionInDb = (data) => {
        let sendData = {};
        sendData.bookTitle = data.get("bookTitle");
        sendData.authorName = data.get("authorName");
        sendData.pointsReward = data.get("pointsReward");

        const token = localStorage.getItem("token");

        fetch(BaseUrl + api + adminControllerEndPoint + addQuestionEndPoint,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify(sendData)
            })
            .then(res => res.json())
            .then(res => {
                setNotification(true);
                setNotificationMsg(res.message);
                res.status == "Success" ? setAlertSuccess(true) : setAlertSuccess(false);
            })
            .catch(console.error)
    }

    const AddQuestion = (e) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        let errorsList = Validate(data);
        if (Object.keys(errorsList).length == 0) {
            CreateQuestionInDb(data);
        }
    }

    const closeSnackbar = () => {
        setNotification(false);
    }

    return (
        <Center>
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ my: 3 }}>Add Book Title and Author name to create a New Question</Typography>
                    <Box sx={{ '.MuiFormControl-root': { m: 1, width: '90%' } }}>
                        <form onSubmit={AddQuestion}>
                            <TextField name="bookTitle" id="outlined-basic" label="Book title" variant="outlined" />
                            {errors.book ? <span style={{ color: 'red' }}>{errors.book}</span> : <span></span>}
                            <TextField name="authorName" id="outlined-basic" label="Author name" variant="outlined" />
                            {errors.author ? <span style={{ color: 'red' }}>{errors.author}</span> : <span></span>}
                            <TextField type="number" name="pointsReward" id="outlined-basic" label="Points reward" variant="outlined" />
                            {errors.pointsReward ? <span style={{ color: 'red' }}>{errors.pointsReward}</span> : <span></span>}
                            <Button sx={{ width: '90%' }} type="submit" variant="contained" size="large">Create question</Button>
                        </form>
                        {notification && <Snackbar
                            open={notification}
                            autoHideDuration={3000}
                            onClose={closeSnackbar}>
                            <Alert severity={alertSuccess ? "success" : "error"} variant="filled">{notificationMsg}</Alert>
                        </Snackbar>}
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}

export default AddNewQuestion;