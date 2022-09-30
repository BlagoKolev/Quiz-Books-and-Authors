import Center from './Center';
import { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, api, questionEndPoint, setScoreEndPoint } from '../Constants/Constants';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Snackbar, Alert } from '@mui/material';
import { UserContext } from '../UserContext';

function Question() {

    const [question, setQuestion] = useState({});
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const { setUser, setScore } = useContext(UserContext);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const addPointsToUserScore = () => {
        const sendData = {};
        sendData.pointsReward = question.pointsReward;

        fetch(BaseUrl + api + questionEndPoint + setScoreEndPoint,
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
                setNotificationMsg(`Correct answer. You just won ${question.pointsReward} points. Total score: ${res.score}`);
                setScore(res.score);
                setUser(res.username);    
            })
            .catch(console.error);
    }

    const checkAnswer = (value) => () => {

        if (value == question.answerId) {
            addPointsToUserScore();
        } else {
            setNotificationMsg('Wrong answer.');
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
            .catch((error) => {
                navigate('/login');
            });

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