import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import DynamicTable from './DynamicTable';
import { Fragment } from 'react';
import NoResults from './NoResultsMessage';
import "bootstrap/dist/css/bootstrap.min.css";

const geocodeApiKey = 'AIzaSyCQtKQ4f9s_mMuNVY44fDCAfValQPITZiw';
const ipInfoApiKey = '5b4b724fbcbf9e';
const segmentIdDict= {"Music":"KZFzniwnSyZfZ7v7nJ", "Sports":"KZFzniwnSyZfZ7v7nE", "Arts&Theatre": "KZFzniwnSyZfZ7v7na", "Film":"KZFzniwnSyZfZ7v7nn","Miscellaneous":"KZFzniwnSyZfZ7v7n1","Default":""};

const FrostedCard = () => {
    const [keyword, setKeyword] = useState(null);
    const [category, setCategory] = useState('Default');
    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState(10);
    const [checkbox, setCheckbox] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultTableData, setResultTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showResultsMessage, setShowResultsMessage] = useState(false);
    const [showDetailsCard, setShowDetailsCard] = useState(false);

    const getGeohash = async (lat,long)=>{
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/geohash?lat=${lat}&long=${long}`);
        return response.data;
    }
  
    const getResultsTableInfo = async (segmentId,geohash)=>{
        if(distance=='')
            setDistance(10);
        const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/resultsTable?keyword=${keyword}&segmentId=${segmentId}&radius=${distance}&geoPoint=${geohash}`);
        return response.data;
    }
    const getGeoCoding = async () => {
        var lat, lng, geo="";
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${geocodeApiKey}`);
          if(response.data.results.length>0){
            lat=response.data.results[0].geometry.location.lat;
            lng=response.data.results[0].geometry.location.lng
            geo = getGeohash(lat, lng); 
          }
          return geo;
    };
    const getIpIfo = async () => {
        var lat, lng, geo="";
        const response = await axios.get(`https://ipinfo.io/?token=${ipInfoApiKey}`);
          if(response.data!==undefined){
            var loc = response.data.loc.split(',');
            lat = loc[0];
            lng = loc[1];
            geo = getGeohash(lat, lng); 
          }
          return geo;
    };
    const getOptions = async (searchText) => {
        if (searchText.length > 0) {
          setOptions([]);
          setLoading(true);
          const response = await axios.get(`https://assignment8webtech.uw.r.appspot.com/keywordAutocomplete?keyword=${searchText}`);
          setLoading(false);
          if(response.data._embedded!==undefined)
            setOptions(response.data._embedded.attractions.map((option) => option.name));
          else {
            setLoading(false);
            setOptions([])
          }
          
        } else {
          setLoading(false);
          setOptions([]);
        }
    };
    const handleSubmit = async (e)=>{
        var geohash, segmentId;
        e.preventDefault(); 
        
        if(location!==''){
            geohash = await getGeoCoding();    
        }
        else {
            geohash = await getIpIfo();
        };
        if(geohash==''){
            setResultTableData([]);
            setShowTable(false);
            setShowResultsMessage(true);
        }
        else{
            segmentId = segmentIdDict[category];
            var response = await getResultsTableInfo(segmentId,geohash);
            setResultTableData(response);
            setShowDetailsCard(false);
            if(response.length>0){
                setShowTable(true);
                setShowResultsMessage(false);
            }
            else {
                setResultTableData([]);
                setShowTable(false);
                setShowResultsMessage(true);
            }
        }

    }
    return (
        <Fragment>
        <Card className='custom-card col-sm-6' style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(13px)',
            webkitbackdropfilter: 'blur(2px)',
            padding: '20px 20px 20px 20px',
            margin:'auto',
            borderRadius:'18px',
            marginTop:'3rem'
        }
        }>
        <Form onSubmit={handleSubmit}>
            <h1 className='formH1 mt-4' style={{fontSize:"40px"}}>Events Search</h1>
            <Form.Group className="mt-3">
                <Form.Label className='formInput'>Keyword<span style={{color:'red'}}>*</span></Form.Label>
                <Autocomplete
                    loadingText={loading && <CircularProgress size={20} />}
                    noOptionsText="No matching results found"
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <Form.Control {...params.inputProps} type="text" required id="keyword"/>
                      </div>
                    )}
                    filterOptions={() => options}
                    isOptionEqualToValue={()=>{return true;}}
                    loading={loading}
                    options={options}
                    value={keyword}
                    onChange={(event, value) => {setKeyword(value);}}
                    onInputChange={(event, value) => {getOptions(value);}}
                />
            </Form.Group>
            <div className="row">
                <Form.Group className="mt-3 col-sm-6" controlId="distance">
                    <Form.Label className='formInput'>Distance</Form.Label>
                    <Form.Control type="number" placeholder="10" value={distance} onChange={(e)=>{setDistance(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mt-3 col-10 col-sm-5" controlId="category">
                    <Form.Label className='formInput'>Category<span style={{color:'red'}}>*</span></Form.Label>
                    <Form.Select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="Default">Default</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts&Theatre">Arts & Theatre</option>
                    <option value="Film">Film</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <Form.Group className="mt-3" controlId="location">
                <Form.Label className='formInput'>Location<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control type="text" required disabled={checkbox} value={location} onChange={(e)=>{setLocation(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mt-3" controlId="checkbox">
                <Form.Check type="checkbox" label="Auto-detect your location" checked={checkbox} onChange={
                    (e)=>{
                        setCheckbox(e.target.checked); 
                        setLocation('');
                    }
                    }/>
            </Form.Group>
            <div className="d-flex justify-content-center mt-3 mb-4">
            <Button variant="danger" type="submit" className='mx-2'>
                SUBMIT
            </Button>
            <Button variant="primary" type="button" className='mx-2' onClick={()=>
                {
                    setCheckbox(false);

                    setLocation('');

                    setDistance(10);
                
                    setKeyword(null);
                
                    setCategory("Default");
                    setResultTableData([]);
                    setShowTable(false);
                    setShowResultsMessage(false);
                    setShowDetailsCard(false);
                
                }
            }>
                CLEAR
            </Button>
            </div>
        </Form>
        </Card>
        {showResultsMessage && (
            <NoResults marginText="8rem auto 8rem auto"></NoResults>
        )}
   
        <DynamicTable data={resultTableData} setShowTable={setShowTable} showTable={showTable} showDetailsCard={showDetailsCard} setShowDetailsCard={setShowDetailsCard}></DynamicTable>
        
        </Fragment>
    );
  };

export default FrostedCard;