import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import MapContainer from './MapContainer';

function PopUpModal(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  return (
    <>
      <Button onClick={handleModal} className="col-sm-4" style={{backgroundColor:"#df2f2f", border:"none", margin:"auto"}}>Show venue on Google map</Button>
      <Modal show={showModal} onHide={handleModal} backdrop="static">
        <Modal.Header>
          <Modal.Title style={{fontWeight:"600"}}>Event Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"450px"}}>
            <MapContainer lat = {props.lat} long = {props.long}></MapContainer>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleModal} style={{ backgroundColor: 'black', margin:"15px 15px 5px 15px" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpModal;
