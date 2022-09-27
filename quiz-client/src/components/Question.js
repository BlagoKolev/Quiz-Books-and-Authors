import Center from './Center';
import { useCallback, useEffect, useState } from 'react';
import { BaseUrl, api, questionEndPoint, setScore } from '../Constants/Constants';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Alert } from '@mui/material';

function Question() {

    let [question, setQuestion] = useState({});

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
            .then(res => alert(`Your score is ${res}`))
            .catch(console.error);
    }

    const checkAnswer = (value) => () => {
        if (value == question.answerId) {
            alert("Correct Answer")
            addPointsToUserScore();
        } else {
            alert("Wrong Answer")
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

    console.log(question)

    return (
        <Center>
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ my: 3 }}>{question.text}</Typography>
                    <Box sx={{ '.MuiFormControl-root': { m: 1, width: '90%' } }}>
                        <List component="nav" aria-label="mailbox folders">
                            {question.options ? question.options.map(x =>
                                <div key={x.id}>
                                    <ListItem button onClick={checkAnswer(x.id)}>
                                        <ListItemText primary={x.name} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                                : ''}
                        </List>
                    </Box>
                </CardContent>
            </Card>
            <Button sx={{ m: 2 }} variant="outlined" onClick={getQuestion} >Skip Question</Button>
        </Center>
    )
}

export default Question;