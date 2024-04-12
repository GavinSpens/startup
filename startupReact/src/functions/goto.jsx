export function goto(page) {
    if (page === '') {
        setPageName('Video Library');
    } else {
        setPageName(page);
    }
    navigate(page);
}