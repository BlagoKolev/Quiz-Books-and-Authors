import { useEffect, useState } from 'react';

function Test() {

    const [data, setData] = useState({});
    let token = localStorage.getItem('token');

    const fetchData = () => {
        fetch('https://localhost:7132/api/Questions',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(res => setData(res))
            .catch(res => console.log(res));
    };
        console.log(data)
    useEffect(() => {
        fetchData();
    },
        []);

    return (<div>
        <h2>Authorize</h2>
        <p>{data.text}</p>
        {data.options.map(x=><p>{x.name} = {x.id}</p>)}
    </div>)
}

export default Test;