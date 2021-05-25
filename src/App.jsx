import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Database
import { useAuthState } from 'react-firebase-hooks/auth';
import db from './db/firebase';
import UserContext from './contexts/UserContext';

// Routed Components
import AllOffers from './components/AllOffers';
import AllCharities from './components/AllCharities';
import Profile from './components/profile-page/Profile';
import Header from './HomePageComponents/Header';
import Homepage from './HomePageComponents/Homepage';
import ChatScreen from './components/chat/ChatScreen';

function App() {
  const [user] = useAuthState(db.auth);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user === null) {
      setUserInfo(null);
      return;
    }
    db.firestore
      .collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserInfo(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, userInfo }}>
        <Router>
          <Header title="CommonGood" />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/donations" exact component={AllOffers} />
            <Route path="/charities" exact component={AllCharities} />
            <Route path="/profile/:uid" exact component={Profile} />
            <Route path="/chat" exact component={ChatScreen} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
