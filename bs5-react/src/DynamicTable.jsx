import React,{useState} from "react";
import DetailsCard from "./DetailsCard";

const DynamicTable = (props) => {
    const [eventId, setEventId] = useState('');
    const [eventName, setEventName] = useState('');
    const [artists, setArtists] = useState([]);
    const [venue, setVenue] = useState([]);
    return (
            <div>
                {props.showTable && (<div className="col-sm-10 mb-5" style={{margin:"8rem auto auto auto", overflowX: "auto"}}>
                    <table className="table table-dark table-striped" style={{borderRadius: "20px", textAlign:"center", margin:"auto", minWidth:"470px", overflow:"hidden"}}>
                        <thead>
                            <tr className="row px-2 tableHead">
                                <th className="col col-md-2">Date/Time</th>
                                <th className="col-2 col-md-1">Icon</th>
                                <th className="col col-md-4">Event</th>
                                <th className="col col-md-2">Genre</th>
                                <th className="col col-md-3">Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.data.map((val) => {
                            return (
                                <tr className="row px-2 dynamicTable" onClick={() => {
                                        console.log("Row clicked!");
                                        setEventId(val.eventId);
                                        setEventName(val.event);
                                        setVenue(val.venue);
                                        props.setShowTable(false);
                                        props.setShowDetailsCard(true);
                                        setArtists(val.artists);
                                    }} style={{cursor:"pointer"}} key={val.eventId}>
                                    <td className="col col-md-2">{val.date}<br></br>{val.time}</td>
                                    <td className="col-2 col-md-1" style={{position: "relative", display: "flex", alignItems: "center"}}>
                                        <img className="col-12 imgMedia" src={val.icon} alt='' style={{margin:"0px auto auto auto"}} onLoad={(e)=>{
                                            e.target.height = e.target.width+5;
                                        }}>
                                        </img>
                                    </td>
                                    <td className="col col-md-4">{val.event}</td>
                                    <td className="col col-md-2">{val.genre}</td>
                                    <td className="col col-md-3">{val.venue}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>)}
                {props.showDetailsCard && (
                    <DetailsCard   setEventId={setEventId} venue={venue} eventId={eventId} eventName={eventName} setShowDetailsCard={props.setShowDetailsCard} setShowTable={props.setShowTable} artists={artists}></DetailsCard>
                )}
            </div>
    );
}

export default DynamicTable;