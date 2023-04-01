import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousal from "./Carousel";
import NoResults from "./NoResultsMessage";

const ArtistsTab = (props)=>{
    return (
        <div>
        { (props.spotifyResponse.length<1) && (
            <NoResults message="No music related artist details to show" marginText="4rem auto 4rem auto"></NoResults>)
        }
        { (props.spotifyResponse.length>0) && (
            <Carousal spotifyResponse={props.spotifyResponse} albumns={props.albumns}></Carousal>)
        }
        </div>

    )
  };
  
export default ArtistsTab;
  