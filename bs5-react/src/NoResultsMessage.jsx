import React from "react";
const NoResults = ({message="No results available", marginText})=>{
  return (
        <p className="col-10 col-sm-8 px-1" style={{color:"#d03c3c", textAlign:"center", borderRadius:"20px", backgroundColor:"white", fontSize:"20px", margin:marginText, fontWeight:600}}>{message}</p>
  )
};

export default NoResults;