import { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./actions/user";
import { getPosts } from "./actions/post";
import { getComments } from "./actions/post";
import { getLogs } from "./actions/log"
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
import { getMessages } from "./actions/messenger";
import { getDataWeatherMyLocation } from './actions/weather';

import './App.css';

function App() {
  const dispatch = useDispatch();
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(function(position) {
          dispatch(getDataWeatherMyLocation(position.coords.latitude, position.coords.longitude))
        });
    },[dispatch])
  useEffect(()=>{
    dispatch(auth())
    dispatch(getPosts())
    dispatch(getComments())
    dispatch(getMessages())
    dispatch(getLogs())
  },[dispatch])

  const isAuth = useSelector(state => state.user.isAuth);

  return (
    <Router>
      <div className="App">
        <Spinner />
        <Navbar />
          <Routes>
              <Route path="/login" element={isAuth ? <Navigate replace to='/'/> : <Login />}/>
              <Route path="/registration" element={<Registration />}/>
              <Route path="/profile/:id" element={<Profile />}/>
              <Route exact path="/" element={isAuth ? <Log /> : <Navigate replace to='/login'/>}/>
              <Route path="/messenger" element={<Messenger />}/>
              <Route path="/messenger/:roomId" element={<Chat />}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/weather" element={<Weather />}/>
              <Route path="*" element={<Navigate replace to='/'/>} />
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;
