import React from 'react';
import { Carousel } from 'react-bootstrap';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { FaSpotify } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

function Carousal(props) {
  var controls = props.spotifyResponse.length>1;
  //console.log(props.albumns)
  const carouselItems = props.spotifyResponse.map(item => {
    return (
      <Carousel.Item key={item.id}>
        <div style={{"textAlign":'center', margin:"auto"}}>
            <div className='row col-sm-10 col-10' style={{margin:"auto"}}>
                <div className='col-8 col-sm-4 mb-3' style={{margin:"auto"}}>
                    <div>
                        <div className='rounded-circle' style={{ margin:"auto", backgroundImage: `url(${item.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '83%', paddingTop: '83%' }}></div>
                    </div>
                    <h4 className='mt-2' style={{color:"#73f1de", fontWeight:700}}>{item.name}</h4>
                </div>
                <div className='col-12 col-sm' style={{margin:"auto", height:"100px"}}>
                    
                    <h5 className='mb-3' style={{color:"#73f1de", fontWeight:700}}>Popularity</h5>
                    <div>
                        <CircularProgress
                            variant="determinate"
                            value={item.popularity}
                            color="secondary"
                            size={40}
                            thickness={4}
                            style={{ position: "absolute", color:"red" }}
                        />
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" {...props} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                            <Typography variant="caption" component="div" color="text.secondary" style={{color:"white", fontWeight:"800"}}>
                                {`${Math.round(item.popularity)}`}
                            </Typography>
                            </Box>
                        </Box>               
                    </div>
                </div>
                <div className='col-12 col-sm' style={{margin:"auto", height:"100px"}} >
               
                        <h5  className='mb-3' style={{color:"#73f1de", fontWeight:700}}>Followers</h5>
                        <p style={{color:"white", fontWeight:"600"}}>{item.followers.total.toLocaleString()}</p>
                 
                </div>
                <div className='col-12 col-sm' style={{margin:"auto", height:"100px"}}>
                
                        <h5 className='mb-3' style={{color:"#73f1de", fontWeight:700}}>Spotify Link</h5>
                        <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer"><FaSpotify color='green' size={40}/></a>
                    
                </div>
            </div>
            <div className='row col-sm-10 col-10 mt-2' style={{margin:"auto"}}>
                <h6 style={{fontSize:"16px", fontWeight:"600", color:"rgb(115, 241, 222)", textAlign: "left", paddingLeft:"1.5rem"}}>Album featuring {item.name}</h6>
                <div className='albumsContainer mt-3 row' style={{margin:"auto"}}>
                    <div className='col-12 col-sm mt-3 albumnImgLeft'>
                        <div className='col-6 col-sm-12' style={{ margin:"auto", backgroundImage: `url(${props.albumns[item.id][0].images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '100%', paddingTop: '100%' }}></div>
                    </div>
                    <div className='col-12 col-sm mt-3'>
                        <div className='col-6 col-sm-12' style={{ margin:"auto", backgroundImage: `url(${props.albumns[item.id][1].images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '100%', paddingTop: '100%' }}></div>
                    </div>
                    <div className='col-12 col-sm mt-3 albumnImgRight'>
                        <div className='col-6 col-sm-12' style={{ margin:"auto", backgroundImage: `url(${props.albumns[item.id][2].images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '100%', paddingTop: '100%' }}></div>
                    </div>
                </div>
            </div>
        </div>
      </Carousel.Item>
    );
  });

  return (
    <Carousel indicators={false} interval={null} controls={controls}>
      {carouselItems}
    </Carousel>
  );
}

export default Carousal;
