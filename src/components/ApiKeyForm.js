/* global chrome */

import React, { useState } from 'react';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const ApiKeyForm = (props) => {

    const [input, setInput] = useState(props.apikey);
    const [showPassword, setShowPassword] = useState();
    const [saved, setSaved] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const useStyles = makeStyles((theme) => ({
        root: {
          textAlign:'center'
        },
        button: {
          marginTop:'20px',
        },
        formInput: {
          marginTop:'20px',
        }
      
      }));
      
    const classes = useStyles();

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(input);
        console.log('saving');
        props.setApikey(input);
    }

    return (
    
    <ThemeProvider theme={props.theme}>
        <Grid className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
        
        <Grid item xs={6}>
            <Grid item container spacing={3}>
                <Grid item xs={12}>
                {props.welcome ? 
                <Typography variant="h3">You're Almost Ready!</Typography> : 
                <Typography variant="h3">Settings</Typography>
                }
                    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">Please enter your Spoonacular API key.  Head over to <a href="https://spoonacular.com/food-api/console#Dashboard" target="_blank">Spoonacular.com</a> and sign up to use this service</Typography>
                </Grid>
            </Grid>
            <Grid item spacing={3}>
            <form id="settings" onSubmit={handleSubmit}>
                <TextField
                type={showPassword ? "text" : "password"}
                defaultValue={props.apikey}
                label="Spoonacular Api Key"
                onChange={e => setInput(e.target.value)}
                fullWidth
                InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                  <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  >Save</Button>
                </form>
            </Grid>
        </Grid>
    </Grid>
  </ThemeProvider>
);
}

export default ApiKeyForm;