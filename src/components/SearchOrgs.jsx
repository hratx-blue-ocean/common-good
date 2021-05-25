import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, makeStyles} from '@material-ui/core';
import AllCharities from './AllCharities';


const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 10,
    display: 'block'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 0,
    marginBottom: 20

  },
}));

const SearchOrgs = () => {

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [criteria, setCriteria] = useState(`name`);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', searchTerm);
  }

  const handleChange = (e) => {
    setCriteria(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Find Charity by Name"
          color="secondary"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <FormControl className={classes.formControl}>
        <InputLabel id="charity-search-criteria" color="secondary">Criteria</InputLabel>
        <Select
          color="secondary"
          labelId="charity-search-criteria"
          id="charity-search-criteria-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={criteria}
          onChange={handleChange}
        >
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='city'>City</MenuItem>
          <MenuItem value='state'>State</MenuItem>
          <MenuItem value='theme'>Charity Theme</MenuItem>
        </Select>
      </FormControl>

      <AllCharities searchTerm={searchTerm} criteria={criteria}/>

    </>
  );

}


export default SearchOrgs;