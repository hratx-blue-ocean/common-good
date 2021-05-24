import React from 'react';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {makeStyles, Card, CardHeader, CardContent, Avatar, Typography, Grid} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  avatar: {
    backgroundColor: '#33bfff',
  },
  content: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 16,
    }
  }
}));

const CharityTile = ({ doc }) => {
  const classes = useStyles();
  const {name, bio, focus, city, state} = doc;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="charity profile" className={classes.avatar}>
              <LocationCityIcon />
            </Avatar>
          }
          title={name}
          subheader={focus}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {bio}
          </Typography>
          <br/>
          <Typography variant="overline">
            {`${city}, ${state}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

}


export default CharityTile;