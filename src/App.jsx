import { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, getAllUsers } from "./actions/user";
import { getPosts } from "./actions/post";
import { getComments } from "./actions/post";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Weather from './components/Weather/Weather';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';
import Log from './components/Map/Map';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Messenger from './components/Messenger/Messenger';
import Chat from './components/Chat/Chat';
import {io} from "socket.io-client";
import { getMessages } from "./actions/messenger";

import './App.css';

function App() {
  const dispatch = useDispatch();
  const socket = io("ws://62.113.108.250:5005");
  
  useEffect(()=>{
    dispatch(getAllUsers())
    if (localStorage.getItem('token')) {
      dispatch(auth())
      dispatch(getPosts())
      dispatch(getComments())
      dispatch(getMessages())
    }
  },[])

  const isAuth = useSelector(state => state.user.isAuth);

  return (
    <Router>
      <div className="App">
        <Spinner />
        <Navbar />
        {!isAuth 
          ?<Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/registration" element={<Registration />}/>
              <Route path="*" element={<Navigate replace to='/login'/>}/>
            </Routes>
          :
          <Routes>
              <Route path="/profile/:id" element={<Profile socket={socket} />}/>
              <Route path="/" element={<Log />}/>
              <Route path="/messenger" element={<Messenger socket={socket} />}/>
              <Route path="/messenger/:roomId" element={<Chat socket={socket} />}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/weather" element={<Weather />}/>
              <Route path="*" element={<Navigate replace to='/'/>} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
