import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTwitter, FaFacebookSquare } from 'react-icons/fa';

var ticketStatusDict = {"onsale":{"name":"On Sale","color":"green"}, "offsale":{"name":"Off Sale","color":"red"}, "cancelled":{"name":"Cancelled","color":"black"}, "postponed":{"name":"Postponed","color":"orange"}, "rescheduled":{"name":"Rescheduled","color":"orange"}};
const EventsTab = ({eventsResponse})=>{
  var ticketStatus = '';
  var ticketStatusColor = '';
  if(ticketStatusDict[String(eventsResponse.ticketStatus).toLowerCase()]!=undefined){
    ticketStatus = ticketStatusDict[String(eventsResponse.ticketStatus).toLowerCase()].name;
    ticketStatusColor = ticketStatusDict[String(eventsResponse.ticketStatus).toLowerCase()].color;
  }
  return (
    <div className="eventsTab row">
        <div className="col-sm-6 eventInfo" style={{textAlign:"center"}}>
            {(eventsResponse.date!=undefined && eventsResponse.date!='') && (<div>
                <h5 className="eventInfoText">Date</h5>
                <p className="eventInfoTextFields">{eventsResponse.date}</p>
            </div>)}
            {(eventsResponse.artist!=undefined && eventsResponse.artist!='') && (<div>
                <h5 className="eventInfoText">Artist/Team</h5>
                <p className="eventInfoTextFields col-sm-8" style={{margin:"auto auto 1rem auto"}}>{eventsResponse.artist}</p>
            </div>)}
            {(eventsResponse.venue!=undefined && eventsResponse.venue!='') && (<div>
                <h5 className="eventInfoText">Venue</h5>
                <p className="eventInfoTextFields">{eventsResponse.venue}</p>
            </div>)}
            {(eventsResponse.genres!=undefined && eventsResponse.genres!='') && (<div>
                <h5 className="eventInfoText">Genres</h5>
                <p className="eventInfoTextFields">{eventsResponse.genres}</p>
            </div>)}
            {(eventsResponse.priceRanges!=undefined && eventsResponse.priceRanges!='') && (<div>
                <h5 className="eventInfoText">Price Ranges</h5>
                <p className="eventInfoTextFields">{eventsResponse.priceRanges}</p>
            </div>)}
            {(ticketStatus!=undefined && ticketStatus!='') && (<div>
                <h5 className="eventInfoText">Ticket Status</h5>
                <p className="eventInfoTextFields"><span className="badge" style={{backgroundColor:ticketStatusColor, fontSize:"1rem"}}>{ticketStatus}</span></p>
            </div>)}
            {(eventsResponse.buyTicketAt!=undefined && eventsResponse.buyTicketAt!='') && (<div className="mb-3">
                <h5 className="eventInfoText">Buy Ticket At</h5>
                <a href={eventsResponse.buyTicketAt} target="_blank" rel="noopener noreferrer">Ticketmaster</a>
            </div>)}
        </div>
        <div className="col-sm-6 eventImg">
            <img className="col-sm-12 col-12" src={eventsResponse.seatMap} alt=''></img>
        </div>
        
        <div style={{margin:"1rem auto auto auto", color:"white", textAlign:"center"}}>
            Share on: 
            <a href={`https://twitter.com/intent/tweet?text=Check ${eventsResponse.eventName} on Ticketmaster.%0D%0A&url=${eventsResponse.buyTicketAt}`} target="_blank" style={{textDecoration:"none"}}><FaTwitter className="me-2" color="rgb(38 146 188)" style={{cursor:"pointer", width:"35px", height:"35px"}}/></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${eventsResponse.buyTicketAt}`} target="_blank" style={{textDecoration:"none"}}> <FaFacebookSquare className="me-2" color="#2453cb" style={{cursor:"pointer", width:"35px", height:"35px"}}/></a>  
        </div>
    </div>
  )
};

export default EventsTab;