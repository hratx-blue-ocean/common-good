/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import db from '../../db/firebase';
import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
    marginTop: 30,
  },
});

function RequestModal({ handleClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [quantity, setQuantity] = useState('');
  const { user } = useContext(UserContext);

  const classes = useStyles();

  const handleSubmit = () => {
    if (!user) {
      console.log('Must be logged in to make a request');
      return;
    }
    const requestData = {
      org_id: user.uid,
      date: new Date(),
      id: uuidv4(),
      title,
      description,
      quantity,
      emergency,
    };
    db.firestore
      .collection('requests')
      .doc()
      .set(requestData)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className={classes.container}>
      <TextField
        id="standard-full-width"
        label="Title"
        style={{ margin: 8 }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        id="standard-full-width"
        label="Description"
        style={{ margin: 8 }}
        margin="normal"
        multiline
        InputLabelProps={{
          shrink: true,
        }}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        id="standard-full-width"
        label="Quantity"
        style={{ margin: 8 }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={emergency}
            onChange={(event) => setEmergency(event.target.checked)}
            name="emergency"
          />
        }
        label="Emergency Request"
      />
      <Container>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
      </Container>
    </Container>
  );
}

export default RequestModal;
