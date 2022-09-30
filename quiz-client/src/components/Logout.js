import {useNavigate} from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    localStorage.clear();
    navigate('/');
}

export default Logout;