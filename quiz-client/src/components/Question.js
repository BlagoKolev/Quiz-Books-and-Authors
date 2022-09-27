import Center from './Center';
import { useCallback, useEffect, useState } from 'react';
import { BaseUrl, api, questionEndPoint, setScore } from '../Constants/Constants';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Snackbar, Alert } from '@mui/material';

function Question() {

    let [question, setQuestion] = useState({});
    let [notification, setNotification] = useState(false);
    let [notificationMsg, setNotificationMsg] = useState('');

    let token = localStorage.getItem('token');

    const addPointsToUserScore = () => {

        const sendData = {};
        sendData.pointsReward = question.pointsReward;

        fetch(BaseUrl + api + questionEndPoint + setScore,
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
                setNotification(true)
                setNotificationMsg(`Correct answer. You just won ${question.pointsReward} points. Total score: ${res}`);
            })
            .catch(console.error);
    }

    const checkAnswer = (value) => () => {

        if (value == question.answerId) {
            addPointsToUserScore();
        } else {
            setNotificationMsg('Wrong anser.');
            setNotification(true);
        }
        getQuestion();
    }

    const getQuestion = useCallback(async () => {
        let data = await fetch(BaseUrl + api + questionEndPoint,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(res => res.json())
            .catch(console.error);

        setQuestion(data);

    }, []);

    useEffect(() => {
        getQuestion()
            .catch(console.error);
    }, [getQuestion]);

    const closeSnackbar = () => {
        setNotification(false);
    }
    console.log(question)

    return (
        <Center>
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ my: 3 }}>{question.text}</Typography>
                    <Box sx={{ '.MuiFormControl-root': { m: 1, width: '90%' } }}>
                        <List component="nav" aria-label="mailbox folders">
                            {question.options
                                ? question.options.map(x =>
                                    <div key={x.id}>
                                        <ListItem button onClick={checkAnswer(x.id)}>
                                            <ListItemText primary={x.name} />
                                        </ListItem>
                                        <Divider />
                                    </div>)
                                : ''}
                        </List>
                        {notification && <Snackbar
                            open={notification}
                            autoHideDuration={3000}
                            onClose={closeSnackbar}>
                            <Alert severity='info'>{notificationMsg}</Alert>
                        </Snackbar>}

                    </Box>
                </CardContent>
            </Card>
            <Button sx={{ m: 2 }} variant="outlined" onClick={getQuestion} >Skip Question</Button>
        </Center>
    )
}

export default Question;