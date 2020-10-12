import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import './App.css';
import { selectUser, login, logout } from './features/userSlice';
import Imessage from './Imessage'
import Login from "./Login"
import { auth } from "./firebase"
 




function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User is Loged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }));
      } else {
        // user is logedout
        dispatch(logout());
      }
    });

  }, []);

  return <div className="app">{user ? <Imessage /> : <Login />}</
  div>;
}

export default App;