import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  
});

const containerStyle = {
    marginTop: '5%'
}

export default function RecipeTabs() {
    
const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && <Box p={3}>{children}</Box>}
        </Typography>
      );
    }

    const handleChangeIndex = (index) => {
        setValue(index);
      };
    const headerStyle = {
      textAlign: 'center'
    }

    const imageStyle = {
      display: 'block',
      margin: '0 auto'
    }

    const calories = "4210"
  return (
    <div >
      <Container style = {containerStyle} ></Container>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          
          aria-label="full width tabs example"
        >
          <Tab label="Recipe" />
          <Tab label="Nutrition" />
        </Tabs>
      
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          
          <Container maxWidth="sm">
            <div ><img src="https://www.edamam.com/web-img/482/482417e9943411f0e7db4be74a7b5114.jpg" style={imageStyle}></img></div>
          <div style={headerStyle}>
            <h1>Caramel Cake</h1>
          </div>
          <div>
            <h2>Ingredients</h2>           
          </div>
          <ul>
              <li>2 tbsp sifted cake flour,for cake</li>
              <li>2 cup sifted cake flour(not self-rising; sift before measuring),for cake</li>
              <li>1 tsp Baking Powder,for cake</li>
              <li>3/4 tsp Baking Soda,for cake</li>
              <li>1/2 tsp Salt,for cake</li>
              <li>1 stick unsalted butter, softened(4 oz),for cake</li>
            </ul>
          <div>
            <h2>Directions</h2>           
          </div>
          <ol>
              <li>Mix Cake</li>
              <li>Cook Cake</li>
              <li>Eat Cake</li>
            </ol>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Container maxWidth="sm">
        <h1>Nutrition</h1>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        
          <TableRow>
            <TableCell align="left">Calories</TableCell>
            <TableCell  align="left">{calories}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Total fat</TableCell>
            <TableCell  align="left">194g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Saturated Fat</TableCell>
            <TableCell  align="left">117g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Trans Fat</TableCell>
            <TableCell  align="left">3g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Monosaturated Fat</TableCell>
            <TableCell  align="left">53g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">PolySaturated Fat</TableCell>
            <TableCell  align="left">9g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Carbs</TableCell>
            <TableCell  align="left">475g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Total Sugars</TableCell>
            <TableCell  align="left">343g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Added Sugars</TableCell>
            <TableCell  align="left">323g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Protein</TableCell>
            <TableCell  align="left">53g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Cholesterol</TableCell>
            <TableCell  align="left">951mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Sodium</TableCell>
            <TableCell  align="left">3106mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Calcium</TableCell>
            <TableCell  align="left">999mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Magnesium</TableCell>
            <TableCell  align="left">343mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Phosphorus</TableCell>
            <TableCell  align="left">1299mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Potassium</TableCell>
            <TableCell  align="left">1182mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Iron</TableCell>
            <TableCell  align="left">24mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Zinc</TableCell>
            <TableCell  align="left">3mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin A</TableCell>
          <TableCell  align="left">1948</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin C</TableCell>
            <TableCell  align="left">3mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Thiamin (B1)</TableCell>
            <TableCell  align="left">3mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Riboflavin (B2)</TableCell>
            <TableCell  align="left">5mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Niacin (B3)</TableCell>
            <TableCell  align="left">343mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin B6</TableCell>
            <TableCell  align="left">0.5mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Folate Equivalent (total)</TableCell>
            <TableCell  align="left">894</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Folate (food)</TableCell>
            <TableCell  align="left">210</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Folic Acid</TableCell>
            <TableCell  align="left">401</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin B12</TableCell>
            <TableCell  align="left">2.05</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin D</TableCell>
            <TableCell  align="left">216 IU</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin E</TableCell>
            <TableCell  align="left">6.3mg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Vitamin K</TableCell>
            <TableCell  align="left">16.3mg</TableCell>
          </TableRow>
      </Table>
    </TableContainer>
    </Container>
        </TabPanel>
        
      </SwipeableViews>
    </div>
  );
  }

  