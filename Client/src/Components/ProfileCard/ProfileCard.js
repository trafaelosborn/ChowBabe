import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 160,
    },
  });

  const cardStyle = {
    margin: '15px',
    height: '505px',
    width: '345px'
  };

export default function MediaCard() {
    const classes = useStyles();
  
    return (
      <Card style={cardStyle} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://img1.looper.com/img/gallery/the-untold-truth-of-gremlins/intro-1537807042.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Gremlin
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Don't feed after midnight
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <FavoriteRoundedIcon  color="secondary"/>
        <DeleteIcon />
        </CardActions>
      </Card>
    );
  }


