/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import { Grid, Typography } from '@material-ui/core';
import background from '../../assets/profileBackground.jpg';

function ProfileHeader({data}) {
  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch">
      <Grid item container direction="row" style={{backgroundImage: `url(${background})`, height: "222px"}} >
        <Grid style={{position: "relative", top: "60px", left: "90px"}}>
          <ProfileAvatar data={data}/>
        </Grid>
      </Grid>
      <Grid container item alignItems="center" style={{backgroundColor: "#7DA1FD", height: "118px"}}>
        <Grid item xs={3} />
        <Typography>{data.name}</Typography>
        <ProfileInfo data={data} />
      </Grid>
    </Grid>
  )
}

export default ProfileHeader
