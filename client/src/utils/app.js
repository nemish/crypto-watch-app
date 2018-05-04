export const handleUser = props => {
    if (props.userId || props.loading) {
        return;
    }
    const token = localStorage.getItem('jwt_token');
    if (token && token !== props.token) {
        props.setTokenToApp(token);
        props.fetchCurrentUser();
    }
}
