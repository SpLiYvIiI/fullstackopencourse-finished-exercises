import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers ({
  notification : notificationReducer,
  anecdote : anecdoteReducer,
  filter : filterReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)

export default store;

