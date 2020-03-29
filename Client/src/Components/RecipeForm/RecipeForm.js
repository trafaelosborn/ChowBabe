import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      display: "inline-block"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  let ingredientArray = []
  let directionArray = []
  
 
  export default function SignIn() {
    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
         
          <Typography component="h1" variant="h3">
            Create a Recipe
          </Typography>
          <form className={classes.form} noValidate>
            
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="ingredient"
              label="Add Ingredient"
              name="ingredient"
              autoFocus
            />
            <AddIcon color="primary"/>
            </form>
            <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="direction"
              label="Add Direction"
              name="direction"
              autoFocus
            />
            <AddIcon color="primary"/>
            </form>

            <h3>Ingredients:</h3>
            <Divider />
            <h3>Directions:</h3>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Recipe!
            </Button>
            
          
        </div>
        <Box mt={8}>
         
        </Box>
      </Container>
    );
  }
        
    

