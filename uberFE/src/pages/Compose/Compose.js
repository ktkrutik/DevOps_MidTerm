import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//import Button from '@material-ui/Button'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';

//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(720 + theme.spacing(6))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const Compose = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dateTime, setDateTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [error, setError] = useState(false);

  // async launch POST
  const registerBooking = async (userName, userEmail, sourceCity, destinationCity, dateTime) => {
    const paramdict = {
      'userName': userName,
      'userEmail': userEmail,
      'sourceCity': sourceCity,
      'destinationCity': destinationCity,
      'dateTime': dateTime
    }

    try {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramdict)
      }
      const response = await fetch("http://54.161.133.200:5000/registerBooking", config);
      // const response = await fetch("http://0.0.0.0:5000/registerBooking", config);
      //const json = await response.json()
      if (response.ok) {
          //return json
          //return response
          console.log("success on send.");
          
      } else {
          alert("launch: failure on send!");
      }

      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {
      console.log(error);
      alert("exception on send");
    }
  };


  const Validate = () => {
    if (userName == "") {
      return false;
    }
    if (sourceCity == "") {
      return false;
    }
    if (destinationCity == "") {
      return false;
    }
    if (dateTime == "") {
      return false;
    }
    const nreg = /^[a-zA-Z ]*$/;
    if (!userName.match(nreg)) {
      return false;
    }
    return true;
  };
  

  async function handleSubmit(event) {
    event.preventDefault();

    if(Validate()) {
      registerBooking(userName, userEmail, sourceCity, destinationCity,
                    dateTime.replace("T", " ") + ":00");  
      alert('Booking Registered Successfully !!!');
    }
    else {
      setError(true)
    }
    
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {"Register Booking"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {error ? <Alert severity="error">Incorrect User Name</Alert>: ''}
            <TextField
              value={userName}
              onInput={(e) => setUserName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label={"User Name"}
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            {/* <TextField
              value={userEmail}
              type="email"
              onInput={(e) => setUserEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label={"User Email"}
              name="userEmail"
              autoComplete="userEmail"
              autoFocus
            /> */}
            
            <InputLabel id="sourceCity">Source City</InputLabel>
            <Select
              labelId={"Source City"}
              id="sourceCity"
              value={sourceCity}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="sourceCity"
              autoFocus
              onChange={(e) => setSourceCity(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Boston'}>Boston</MenuItem>
              <MenuItem value={'Chicago'}>Chicago</MenuItem>
              <MenuItem value={'Dallas'}>Dallas</MenuItem>
              <MenuItem value={'Atlanta'}>Atlanta</MenuItem>
            </Select>

            <InputLabel id="sourceCity">Destination City</InputLabel>
            <Select
              labelId={"Destination City"}
              id="destinationCity"
              value={destinationCity}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="destinationCity"
              autoFocus
              onChange={(e) => setDestinationCity(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Boston'}>Boston</MenuItem>
              <MenuItem value={'Chicago'}>Chicago</MenuItem>
              <MenuItem value={'Dallas'}>Dallas</MenuItem>
              <MenuItem value={'Atlanta'}>Atlanta</MenuItem>
            </Select>
            
            {/* <TextField
              value={destinationCity}
              onInput={(e) => setDestinationCity(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="destinationCity"
              label={"Dmestination City"}
              name="destinationCity"
              autoComplete="destinationCity"
              autoFocus
            /> */}

            <TextField
              value={dateTime}
              onInput={(e) => setDateTime(e.target.value)}
              type="datetime-local"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dateTime"
              label={"Date & Time"}
              name="dateTime"
              autoComplete="dateTime"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Submit"}
            </Button>
          </form>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          ></div>
        </div>
      </Paper>
    </React.Fragment>
  );
}

export default Compose
