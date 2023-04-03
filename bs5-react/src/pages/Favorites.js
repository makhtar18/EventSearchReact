import React, { useState } from "react";
import NoResults from "../NoResultsMessage";
import { BsTrash } from 'react-icons/bs';

export default function Favorites() {
  const favoriteTableString = localStorage.getItem('favoriteTable');
  var favoriteTable = JSON.parse(favoriteTableString);
  const [rows, setRows] = useState(Object.keys(favoriteTable));

  const handleDelete = (eventId)=>{
    delete favoriteTable[eventId];
    var favoriteTableStr = JSON.stringify(favoriteTable);
    localStorage.setItem('favoriteTable',favoriteTableStr);
    alert("Removed from favorites!");
    setRows(Object.keys(favoriteTable));
  }

  return (
    <div>
      { (rows.length === 0) && (
        <NoResults message="No favorite events to show" marginText="4rem auto auto auto"></NoResults>)
      }

      {(rows.length > 0) && (<div className="col-sm-9" style={{margin:"4rem auto auto auto"}}>
                    <h5 style={{textAlign:"center", color:"rgb(115, 241, 222)"}}>List of your favorite events</h5>
                    <div style={{overflowX: "auto"}}>
                    <table className="table table-light table-striped mt-4 table-responsive" style={{borderRadius: "20px", textAlign:"center", margin:"auto", minWidth:"470px", overflow:"hidden"}}>
                        <thead>
                            <tr className="px-2">
                                <th className="col col-md-1 indexClass">#</th>
                                <th className="col col-md-2 dateClass">Date</th>
                                <th className="col col-md-3 eventClass">Event</th>
                                <th className="col col-md-2 categoryClass">Category</th>
                                <th className="col col-md-3 venueClass">Venue</th>
                                <th className="col col-md-1">Favorite</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map((eventId, index) => {
                            var val = favoriteTable[eventId];
                            return (
                                <tr className="px-2" key={eventId}>
                                    <td className="col col-md-1 indexClass" ><b>{index+1}</b></td>
                                    <td className="col col-md-2 dateClass">{val.date}</td>
                                    <td className="col col-md-3 eventClass">{val.event}</td>
                                    <td className="col col-md-2 categoryClass">{val.category}</td>
                                    <td className="col col-md-3 venueClass">{val.venue}</td>
                                    <td className="col col-md-1"><BsTrash onClick={() => handleDelete(eventId)} style={{cursor:"pointer"}}/></td>
                                </tr>
                            )
                          })}
                        </tbody>
                    </table>
                    </div>
                </div>)}
    </div>
  );
}
