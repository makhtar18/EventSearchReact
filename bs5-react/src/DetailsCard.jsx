import React from "react";
import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Favorite from "./Favorite";
import { FiChevronLeft } from 'react-icons/fi';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSpring, animated } from 'react-spring';
import axios from "axios";
import EventsTab from "./EventsTab";
import ArtistsTab from "./ArtistsTab";
import VenueTab from "./VenueTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const animation = useSpring({
    opacity: value === index ? 1 : 0,
    transform: `translate3d(${value === index ? 0 : 100}px, 0, 0)`,
  });
  return (
    <animated.div
      style={animation}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </animated.div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  
const DetailsCard = (props)=>{
    const [value, setValue] = useState(0);
    const [eventsResponse, setEventsResponse] = useState({});
    const [spotifyResponse, setSpotifyResponse] = useState([]);
    const [spotifyAlbumnResponse, setSpotifyAlbumnResponse] = useState({});
    const [venueResponse, setVenueResponse] = useState([]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      async function getAccessToken() {
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/getSpotifyAuthToken`);
        return response.data;
      }
      async function getSpotifyResponse(mRA) {
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/spotifyResults?musicRelatedArtists=${mRA}`);
        return response.data;
      }
      async function getEventData() {
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/eventsInfo?eventId=${props.eventId}`);
        const eventData = await response.data;
        //console.log("EventData called", eventData);
        setEventsResponse(eventData);
        var spotifyRes = await getSpotifyResponse(eventData.musicRelatedArtists);
        if(spotifyRes.musicRelatedArtists.length<1){
          await getAccessToken();
          spotifyRes = await getSpotifyResponse(eventData.musicRelatedArtists);
        }
        setSpotifyResponse(spotifyRes.musicRelatedArtists);
        setSpotifyAlbumnResponse(spotifyRes.spotifyAlbumnResponse);
      };
      getEventData();
    }, [props.eventId]);

    useEffect(() => {

      async function getVenueDetails(venue) {
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/getVenueDetails?venue=${venue}`);
        console.log("Venue status code ",response.status);
        return response.data;
      }

      const getVenueData = async () => {
        var venue = await getVenueDetails(props.venue);
        //console.log(venue);
        setVenueResponse(venue);
      };

      getVenueData();
    }, [props.venue]);

    return (
    <Card className='detailsCard col-sm-8 py-3' style={{
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(13px)',
        margin:'auto',
        borderRadius: '0px',
        marginTop:'3rem',
        marginBottom:'3rem'
    }
    }>
        <a className="mx-2" href="#" style={{padding:"0px", border:"0px", backgroundColor:"transparent", color:"white"}} onClick={()=>{
          props.setShowDetailsCard(false);
          props.setShowTable(true);
        }}><FiChevronLeft style={{width:"21px", height:"auto"}}/><u>Back</u></a>
        <div className="p-2" style={{alignItems: "center", margin:"auto"}}>
          <h3 style={{color: "white", margin: "0", display: "flex", alignItems: "center", textAlign:"center", display:"inline-block"}}>
            {props.eventName}
            <Favorite eventsResponse={eventsResponse} eventId={props.eventId}/>
          </h3>
        </div>
        <Box sx={{ width: '100%' }} className="mt-4">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered style={{backgroundColor:"#4c9c8c"}}>
              <Tab label="Events" {...a11yProps(0)}/>
              <Tab label="Artist/Teams" {...a11yProps(1)} />
              <Tab label="Venue" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <EventsTab eventsResponse={eventsResponse}></EventsTab>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ArtistsTab attractionName={props.artists} spotifyResponse={spotifyResponse} albumns={spotifyAlbumnResponse}/>
           </TabPanel>
          <TabPanel value={value} index={2}>
            <VenueTab venueResponse={venueResponse}></VenueTab>
          </TabPanel>
        </Box>
    </Card>
  )
};

export default DetailsCard;
