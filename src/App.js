import React,{useState, useEffect} from 'react';
import {CssBaseline, Grid} from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App=()=>{
   
       const [childClicked,setChildClicked]=useState(null);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
     const [places,setPlaces]= useState([]);
    const [coordinates,setCoordinates]=useState({lat: 0, lng:0});
    const [bounds, setBounds]=useState({});
     const [isLoading, setIsLoading]= useState(false);
     const [filteredPlaces, setFilteredPlaces] = useState([]);
  

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
            setCoordinates({lat: latitude, lng: longitude});
        })
    },[]);

    useEffect(()=>{
       const filteredPlaces =places.filter((place)=>place.rating>rating);
       setFilteredPlaces(filteredPlaces);
       
    },[rating]);

    useEffect(()=>{
       if(bounds.sw && bounds.ne){
    
         setIsLoading(true);
      getPlacesData(type,bounds.sw, bounds.ne)
       .then((data)=>{
       
           setPlaces(data?.filter((place)=> place.name && place.num_reviews>0));
            setFilteredPlaces([]);
           setIsLoading(false);
       })
    }
     },[type,bounds]);
    return (
     
        <>
        <CssBaseline/>
          
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List
                  places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
                 isLoading={isLoading}
                type ={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                 setCoordinates={setCoordinates}
                 setBounds={setBounds}
                 coordinates={coordinates}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  setChildClicked={setChildClicked}
               />
            </Grid>
        </Grid>
           
        </>
    );
}

export default App;