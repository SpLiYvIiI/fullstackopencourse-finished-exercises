import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import loginReducer from './reducer/loginReducer'
import usersReducer from './reducer/usersReducer'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers ({
  notification : notificationReducer,
  blog : blogReducer,
  user : loginReducer,
  users : usersReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)

export default store;

