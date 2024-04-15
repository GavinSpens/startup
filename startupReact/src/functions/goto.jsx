import { useNavigate } from 'react-router-dom';

export function Goto(page) {
    const navigate = useNavigate();
    navigate(page);
}