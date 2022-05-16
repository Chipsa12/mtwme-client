import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import weatherReducer from "./weatherReducer";
import appReducer from "./appReducer";
import logReducer from "./logReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import conversationReducer from "./conversationReducer";
import messengerReducer from "./messengerReducer";



const rootReducer = combineReducers({
    user: userReducer,
    weather: weatherReducer,
    app: appReducer,
    log: logReducer,
    post: postReducer,
    comment: commentReducer,
    conversation: conversationReducer,
    messenger: messengerReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
