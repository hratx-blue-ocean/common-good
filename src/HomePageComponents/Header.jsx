/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

// Login Components
import LoginButton from '../components/modals/LoginButton';
import LogoutButton from '../components/modals/LogoutButton';
import SignupButton from '../components/modals/SignupButton';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 150,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const { userInfo } = useContext(UserContext);

  const navStyle = {
    color: 'black',
    textDecoration: 'none',
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    // fontFamily: "'Abril Fatface', cursive"
    fontFamily: "'Pattaya', sans-serif",
    fontSize: "45px",
  };

  return (
    <>
    <div className={classes.root}>
    <AppBar position="fixed" style={{boxShadow: 'none', background: '#6ec6ff'}}>
      <Toolbar className={classes.toolbar}>
        <SignupButton />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          style={{justifyContent: 'center'}}
        >
          <Link key="homepage" to="/" style={logoStyle}>
            {title}
          </Link>
        </Typography>
        <LoginButton />
        <LogoutButton />
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <div>
          {userInfo && (
            <Link
              key="profile"
              to={{
                pathname: `/profile/${userInfo.uid}`,
                state: {
                  userId: userInfo.uid,
                  type: "user"
                }
              }}
              style={navStyle}
            >
              Profile
            </Link>
          )}
        </div>

        <Link key="donations" to="/donations" style={navStyle}>
          Requests & Donations
        </Link>
        <Link key="charities" to="/charities" style={navStyle}>
          Charities
        </Link>
        <div>
          {userInfo && (
            <Link
              key="chat"
              to={{
                pathname: `/chat/${userInfo.uid}`,
                state: {
                  userId: userInfo.uid,
                },
              }}
              style={navStyle}
            >
              Chat
            </Link>
          )}
        </div>
      </Toolbar>
      </AppBar>
      </div>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};


