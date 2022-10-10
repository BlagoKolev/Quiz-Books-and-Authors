import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BaseUrl, api, statistics, scoresEndPoint } from '../Constants/Constants';
import { useCallback, useEffect, useState } from 'react';

function createData(name, score) {
    return { name, score };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function ScoreTable() {

    let [score, setScore] = useState([]);

    const getScoreData = useCallback(async () => {
        let data = await fetch(BaseUrl + api + statistics + scoresEndPoint,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .catch(console.error)

        setScore(data);

    }, []);

    useEffect(() => {
        getScoreData();
    }, [getScoreData])

    return (
        <TableContainer sx={{maxWidth:600}} component={Paper}>Top participants
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Username</TableCell>
                        <TableCell align="center">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {score.map(x => (
                        <TableRow
                            key={x.username}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="">
                                {x.username}
                            </TableCell>
                            <TableCell align="right">{x.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        //<div>{score.map(x => <div>{x.username} - {x.score}</div>)}</div>
    );
}


export default ScoreTable;