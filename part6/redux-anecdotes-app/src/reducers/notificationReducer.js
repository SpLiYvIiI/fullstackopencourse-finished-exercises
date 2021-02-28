let timeout;
const reducer = (state = '', action) => {
    switch(action.type){
        case 'SETNOTIFICATION' : return action.notification;
        case 'CLEARNOTIFICATION' : return '';
        case 'CLEARTIMEOUT' : {
            clearTimeout(timeout)
            return state
        }
        default : return state;
    }
}
export const setNotification = (notification,duration) =>{
    return async dispatch =>{
        dispatch(
            {
                type : 'SETNOTIFICATION',
                notification : notification
            }
        )
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({
                type : 'CLEARNOTIFICATION'
            })
        }, duration);
    }
}

export default reducer