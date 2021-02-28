import blogService from '../services/blogService'
import loginService from '../services/loginService'

const reducer = (state = null, action) => {
    switch (action.type){
        case 'SETUSER' :{
            return action.data
        }
        default : return state
    }
}

export const loginUser  = (newObj) =>{
    return async dispatch => {
        try{
            const resp = await loginService.signIn(newObj)
            window.localStorage.setItem('loggedUser',JSON.stringify(resp))
            dispatch({
                type : 'SETUSER',
                data : resp
            })
            blogService.setToken(resp.token)
          }
        catch(error){
            throw error
        }
    }
}
export const isLoggedIn = () => {
    return async dispatch =>{
        const isLoggedIn = window.localStorage.getItem('loggedUser')
        if(isLoggedIn){
          const parsed = JSON.parse(isLoggedIn)
          dispatch({
              type: 'SETUSER',
              data : parsed
          })
          blogService.setToken(parsed.token)
        }
    }
}
export const logOut = () =>{
    return async dispatch => {
        dispatch({
            type : 'SETUSER',
            data : null
        })
        blogService.setTokenNull()
        window.localStorage.clear()
    }
}

export default reducer