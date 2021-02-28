import usersService from '../services/usersService'


const reducer = (state = [],action) => {
    switch(action.type){
        case 'INITUSERS' : return action.data
        default: return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const data = await usersService.getAllUser()
        dispatch({
            type : 'INITUSERS',
            data : data
        })
    }
}


export default reducer