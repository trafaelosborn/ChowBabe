import React, {useRef, useState} from 'react'
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


export default function SignIn() {
    const classes = useStyles();


    const [inputItems, setInputItems] = useState([]);
    const [directionItems, setDirectionItems] = useState([]);

    // testInput creates an input reference to use to catch 
    // the value of our input on submit
    const testInput = useRef();
    const directionInput = useRef();

    // Input handler for form submission
    const formSubmitted = (event) => {
        event.preventDefault();
        setInputItems(prevState => [...prevState, testInput.current.value]);
        console.log(inputItems);
    }

    const directionSubmitted = (event) => {
        event.preventDefault();
        setDirectionItems(prevState => [...prevState, directionInput.current.value]);
        console.log(directionItems);
    }

    const centered = {
        alignItems : 'center'
    }

    const listStyle = {
        alignItems : "left"
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div></div>
                <Typography style={centered}  component="h1" variant="h3">
                Create a Recipe
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="ingredient"
                        label="Recipe Name"
                        name="inputTest"
                        inputRef=""
                        autoFocus
                    />
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="ingredient"
                        label="Add Ingredient"
                        name="inputTest"
                        inputRef={testInput}
                        autoFocus
                    />
                    {/* <input name={'inputTest'} placeholder="Type Input Item" ref={testInput} /> */}
                    <AddIcon color="primary" onClick={(event) => { formSubmitted(event); }} />
                </form>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="direction"
                        label="Add Direction"
                        name="direction"
                        inputRef={directionInput}
                        autoFocus
                    />
                    <AddIcon color="primary" onClick={(event) => { directionSubmitted(event); }}/>
                </form>
                </div>
                <h3>Ingredients:</h3>
                <div style={listStyle}>
                <ul>
                    {inputItems.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        );
                    })}
                </ul>
                </div>
                <Divider />
                <h3>Directions:</h3>
                <div style={listStyle}>
                <ol>
                    {directionItems.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        );
                    })}
                </ol>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create Recipe!
            </Button>


            
            <Box mt={8}>

            </Box>
        </Container>
    );
}



