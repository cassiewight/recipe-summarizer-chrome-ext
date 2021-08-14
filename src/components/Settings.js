import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

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

const Settings = (props) => {

    const [input, setInput] = useState(props.apikey);
    const [showPassword, setShowPassword] = useState();
    const [saved, setSaved] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('input: ' + input);
        props.setApikey(input);
        setSaved(true);
    }
    const handleClose = () => {
        setSaved(false);
    }

    const useStyles = makeStyles((theme) => ({
        snack: {
            backgroundColor:'green'
        }

    }));


    const classes = useStyles();

    return(
        <Grid container xs={12}>
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
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }} 
            open={saved}
            autoHideDuration={1000}
            onClose={handleClose}
            message="settings saved"
            ContentProps={{className: classes.snack}}
            />
        </Grid>
       
    )
}

export default Settings;