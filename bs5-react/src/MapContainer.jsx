import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '93.5%',
  height: '100%'
};

const MapContainer = (props) => {
  const [center, setCenter] = useState({ lat: props.lat, lng: props.long });
  const [zoom, setZoom] = useState(14.3);

  return (
    <Map
      google={props.google}
      zoom={zoom}
      style={mapStyles}
      initialCenter={center}
    >
      <Marker position={center} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCQtKQ4f9s_mMuNVY44fDCAfValQPITZiw',
})(MapContainer);