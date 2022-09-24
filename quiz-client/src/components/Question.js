import Center from './Center';
import { useCallback, useEffect, useState } from 'react';
import { BaseUrl, api, questionEndPoint } from '../Constants/Constants';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

function Question() {

    let [question, setQuestion] = useState({});
    
    let token = localStorage.getItem('token');

    const sendAnswer = (value) => () => {
        // fetch(BaseUrl + api,
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'token': `Bearer ${token}`
        //         },
        //         method: "POST",
        //         body: JSON.stringify(value)
        //     })
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        //     .catch(console.error);
        

        if (value == question.answerId) {
            alert("Rigth Answer")
        }else {
            alert("Wrong Answer")
        }
        getQuestion();
        console.log(value)
    }

    const getQuestion = useCallback(async () => {
        let data = await fetch(BaseUrl + api + questionEndPoint,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
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
                                    <ListItem button onClick={sendAnswer(x.id)}>
                                        <ListItemText primary={x.name} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                                : ''}
                            {/* {question.options.map(x =>
                                <div key={x.id}>
                                    <ListItem button >
                                        <ListItemText primary={x.name} />
                                    </ListItem>
                                    <Divider />
                                </div>)
                            } */}
                        </List>
                    </Box>
                </CardContent>
            </Card>
            <Button sx={{ m: 2 }} variant="outlined" onClick={getQuestion} >Skip Question</Button>
        </Center>
    )
}

export default Question;