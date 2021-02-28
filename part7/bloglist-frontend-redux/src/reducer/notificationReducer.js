let timeout;
const reducer = (state = {message : null, typ : null}, action) => {
    switch(action.type){
        case 'SETNOTIFICATION' : return {message : action.message, typ : action.typ};
        case 'CLEARNOTIFICATION' : return  {message : null, typ : null};
        default : return state;
    }
}
export const setNotification = (message,typ,duration) =>{
    return async dispatch =>{
        dispatch(
            {
                type : 'SETNOTIFICATION',
                message : message,
                typ : typ
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