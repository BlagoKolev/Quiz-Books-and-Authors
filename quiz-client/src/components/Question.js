import Center from './Center';
import { useCallback, useEffect, useState } from 'react';
import { BaseUrl, api, questionEndPoint } from '../Constants/Constants';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

function Question() {

    let [question, setQuestion] = useState({});
    let token = localStorage.getItem('token');

    const fetchData = useCallback(async () => {
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
        fetchData()
            .catch(console.error);
    }, [fetchData]);

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
                                    <ListItem button >
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
            <Button sx={{m:2}} variant="outlined" onClick={fetchData} >Skip Question</Button>
        </Center>
    )
}

export default Question;