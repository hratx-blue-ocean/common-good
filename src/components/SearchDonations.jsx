/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import {
  TextField,
  FormGroup,
  Grid,
  Switch,
  makeStyles,
  Typography,
} from '@material-ui/core';
import UserContext from '../contexts/UserContext';
import AllOffers from './AllOffers';
import AllRequests from './AllRequests';
import RequestButton from './modals/RequestButton';
import OfferButton from './modals/OfferButton';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 0,
    marginBottom: 20,
  },
  switch: {
    marginTop: 20,
  },
}));

const SearchOrgs = () => {
  const classes = useStyles();
  const { userInfo } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchState, setSwitchState] = useState(false); // false => reqs | true => donations

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', searchTerm);
  };

  const handleSwitch = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <>
      <FormGroup>
        <Typography className={classes.switch} variant="overline">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Requests</Grid>
            <Grid item>
              <Switch
                checked={switchState}
                color="primary"
                onChange={handleSwitch}
                name="search-type"
                color="primary"
              />
            </Grid>
            <Grid item>Donations</Grid>
          </Grid>
        </Typography>
      </FormGroup>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Search by Item Name"
          color="secondary"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Button for listing creation appears only if user is logged in, and depends on whether user is an donor or an org */}
      {userInfo && userInfo.uid ? (
        !switchState ? (
          userInfo.type === 'org' ? (
            <RequestButton>Make a Request</RequestButton>
          ) : (
            <></>
          )
        ) : userInfo.type === 'user' ? (
          <OfferButton>Make a Donation</OfferButton>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {switchState ? (
        <AllOffers searchTerm={searchTerm} />
      ) : (
        <AllRequests searchTerm={searchTerm} />
      )}
    </>
  );
};

export default SearchOrgs;
