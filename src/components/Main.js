import React, { useEffect, useState } from 'react';
import { extractRecipeByUrl } from '../ApiHelper';

import Instructions from './Instructions';
import Ingredients from './Ingredients';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Main = (props) => {

    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState({});
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [unit, setUnit] = useState('');
    const [originalServings, setOriginalServings] = useState();
    const [error, setError] = useState('');
    
    const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };



    //similar to ComponentDidMount
    useEffect(() => {
        if(props.url != '' && loading){
            const query = (extractRecipeByUrl(props.url, props.apikey));
            fetch(query,
                    {
                        method : "GET"
                    })
                    .then(response => response.json()
                  )
                    .then(data => {
                        console.log(data);
                        setRecipe(data);
                        setInstructions(data.analyzedInstructions[0].steps);
                        setIngredients(data.extendedIngredients);
                        setOriginalServings(data.servings);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log('error: ' + error);
                        setError(error);
                        setLoading(false);
                    }
                );
        }
    }, [props.url, props.apikey, loading]);
    
/////////////////////
// Loading Screen
   if(loading){
       return (
          <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
            <CircularProgress />
          </Grid>
       );
   }

    else{ 
/////////////////////
// Error Screen
        if(error != ''){
          return(
              <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
              >
                <Grid item>
                  <Typography variant="h3">Oops... Something went wrong here</Typography>
                </Grid>
                <Grid item>
                  <Typography variang="body1">
                    Possible Reasons: You have the wrong API key, you have landed on a page that does not contain a single recipe, or the page you have landed on has software that makes in uncrawable.
                  </Typography>
                  <Typography variant="body1">Settings</Typography>
                </Grid>
              </Grid>
            );
        }
        else{
/////////////////////
// Main Screen
            return (
              
                    <Grid container>
                      <Grid item container xs={12}>
                        <Grid item container xs={12} style={{position:'sticky', top:0, background:'white'}}>
                        <Grid 
                        item 
                        container 
                        xs={12}
                        >
                          <Grid item xs={12}>
                            <Typography variant="h5" style={{padding:'15px'}}>{recipe.title}</Typography>
                          </Grid>
                        </Grid>
                       
                          <Grid item xs={12}>
                            <Tabs
                                  value={value}
                                  onChange={handleChangeTab}
                                  aria-label="tabs"
                                  centered
                                  variant="fullWidth"
                                  defaultValue={originalServings}
                                  >
                                  <Tab label="Ingredients" {...a11yProps(0)}/>
                                  <Tab label="Instructions" {...a11yProps(1)}/>
                                  <Tab label="Summary" {...a11yProps(2)}/>
                              </Tabs>
                             
                          </Grid>
                          </Grid>
                          <TabPanel value={value} index={0}>
                              <Ingredients ingredients={ingredients} unit={unit} />
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                              <Instructions instructions={instructions}/>
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                          </TabPanel>
  
                          </Grid>
                      </Grid>              
              );
          

        }
    }
}

export default Main;