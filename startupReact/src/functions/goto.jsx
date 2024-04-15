import { useNavigate } from 'react-router-dom';

export function Goto(page) {
    // if (page === '') {
    //     setPageName('Video Library');
    // } else {
    //     setPageName(page);
    // }
    const navigate = useNavigate();
    navigate(page);
}